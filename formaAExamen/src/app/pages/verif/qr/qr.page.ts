import { Component, inject } from '@angular/core';
import QRCode from 'qrcode';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Asistencia } from 'src/app/models/asistencia.model';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  qrCodeData: string = ''; // Inicialmente vacío

  form = new FormGroup({
    uid: new FormControl(''), // UID del usuario o sesión
    asignatura: new FormControl('', [Validators.required]),
    hora: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required])
  });

  constructor() {}

  async generarQRCode() {
    // Generar un identificador único para la asistencia
    const randomString = Math.random().toString(36).substring(2, 15);  // Cadena aleatoria
    const qrCodeIdentifier = randomString;  // Usamos la cadena como identificador único, guardado en qrCodeIdentifier

    this.qrCodeData = '';  // Limpiamos la variable qrCodeData antes de crear el nuevo código QR
    
    // Verificar que la cadena se genere correctamente
    console.log("Código QR generado:", qrCodeIdentifier);
  
    try {
      // Generar el código QR solo con el identificador único
      this.qrCodeData = await QRCode.toDataURL(qrCodeIdentifier); // El código QR será solo el ID, en formato de imagen
      console.log("Código QR en formato base64:", this.qrCodeData);
    } catch (error) {
      console.error('Error al generar el código QR:', error);
    }
  
    // Ahora el valor qrCodeIdentifier (randomString) es lo que vas a usar para el path de Firebase
    return qrCodeIdentifier;
  }
  
  

  async submit() {
    // Asegurarse de que el formulario sea válido antes de guardar
    if (this.form.valid && this.qrCodeData) {
      const loading = await this.utilsSvc.loading();
      await loading.present();
  
      try {
        const qrCodeIdentifier = await this.generarQRCode(); // Obtenemos el identificador único para la asistencia
  
        // Recuperar el nombre del usuario creador del almacenamiento local
        const creador = await this.utilsSvc.obtenerlocal('user');
        const creadorNombre = creador ? creador.name : 'Desconocido';

        const asistencia: Asistencia = {
          uid: qrCodeIdentifier, // Este campo debe estar lleno con el UID del usuario actual
          asignatura: this.form.controls.asignatura.value,
          hora: this.form.controls.hora.value,
          fecha: this.form.controls.fecha.value,
          qrCodeUrl: this.qrCodeData, // Guardamos el QR generado en base64
          usuarios: [], // Lista inicial de usuarios asistentes
          creadorNombre: creadorNombre // Añadimos el nombre del creador
        };
  
        // Usar el valor de qrCodeIdentifier como parte del path
        const path = `asistencias/${qrCodeIdentifier}`;
        console.log("Path de guardado de la asistencia:", path); // Mostrar el path completo
  
        // Guardar la asistencia en Firebase
        await this.firebaseSvc.nuevoDocumento(path, asistencia);
        console.log('Asistencia guardada en path:', path);
        
        // Ahora intenta obtener el documento recién guardado para verificar
        const docData = await this.firebaseSvc.obtenerDocumento(path);
        console.log('Documento guardado:', docData);
  
        this.utilsSvc.presentToast({
          message: 'Asistencia guardada exitosamente',
          duration: 2000,
          color: 'success',
          position: 'middle'
        });
  
      } catch (error) {
        console.error('Error al guardar la asistencia:', error);
        this.utilsSvc.presentToast({
          message: 'Error al guardar la asistencia',
          duration: 2500,
          color: 'danger',
          position: 'middle'
        });
      } finally {
        loading.dismiss();
      }
    } else {
      this.utilsSvc.presentToast({
        message: 'Completa el formulario antes de guardar la asistencia',
        duration: 2000,
        color: 'warning',
        position: 'middle'
      });
    }
  }
  
  
  

  // Función para borrar el código QR cuando ya no sea necesario
  borrarQRCode() {
    this.qrCodeData = ''; // Esto borra el QR de la vista
  }

  regresarHome() {
    this.utilsSvc.rutaLink('verif/home');
  }
}
