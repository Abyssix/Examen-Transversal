import { Component, inject } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user.model';
import { Asistencia } from 'src/app/models/asistencia.model';

@Component({
  selector: 'app-tomasis',
  templateUrl: './tomasis.page.html',
  styleUrls: ['./tomasis.page.scss'],
})
export class TomasisPage {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  scanActive: boolean = false; // Variable para activar o desactivar el escaneo
  scannedCode: string = ''; // Almacena el código QR escaneado

  constructor() {}

  async onCodeResult(result: string) {
    this.scannedCode = result; // Aquí almacenamos el código QR escaneado
    console.log('Código QR escaneado:', this.scannedCode);
  
    const asistenciaPath = `asistencias/${this.scannedCode}`;
    console.log('Path de la asistencia:', asistenciaPath); // Verifica el valor completo del path
  
    const user = await this.firebaseSvc.auth.currentUser;
    const userId = user ? user.uid : null;
  
    if (userId) {
      try {
        const asistenciaData = await this.firebaseSvc.obtenerDocumento(asistenciaPath);
        console.log('Datos de la asistencia obtenidos:', asistenciaData);
  
        if (asistenciaData) {
          if (!Array.isArray(asistenciaData['usuarios'])) {
            asistenciaData['usuarios'] = []; // Inicializa 'usuarios' si no es un arreglo
          }
  
          // Agregar el usuario a la lista de usuarios si no está presente
          if (!asistenciaData['usuarios'].includes(userId)) {
            asistenciaData['usuarios'].push(userId); // Agregar el UID del usuario
            
            // Actualizar el documento en Firestore con todos los datos originales y la lista de usuarios actualizada
            await this.firebaseSvc.nuevoDocumento(asistenciaPath, asistenciaData);
  
            this.utilsSvc.presentToast({
              message: 'Asistencia registrada exitosamente',
              duration: 2000,
              color: 'success',
              position: 'middle'
            });
          } else {
            this.utilsSvc.presentToast({
              message: 'Ya has registrado tu asistencia',
              duration: 2000,
              color: 'warning',
              position: 'middle'
            });
          }
        } else {
          console.log("Asistencia no encontrada en la base de datos");
          this.utilsSvc.presentToast({
            message: 'Código QR no válido o asistencia no registrada',
            duration: 2500,
            color: 'danger',
            position: 'middle'
          });
        }
      } catch (error) {
        console.error('Error al registrar asistencia:', error);
        this.utilsSvc.presentToast({
          message: 'Error al registrar asistencia',
          duration: 2500,
          color: 'danger',
          position: 'middle'
        });
      }
    } else {
      console.log("No se encontró el usuario");
      this.utilsSvc.presentToast({
        message: 'No se pudo encontrar el usuario',
        duration: 2500,
        color: 'danger',
        position: 'middle'
      });
    }
  }
  
  
  
  

  toggleScanner() {
    this.scanActive = !this.scanActive;  // Activa o desactiva el escaneo
  }
}
