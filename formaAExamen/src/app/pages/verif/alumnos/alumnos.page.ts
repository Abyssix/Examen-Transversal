import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { Asistencia } from 'src/app/models/asistencia.model'; // Importa tu modelo

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {
  asistenciaId: string | null = null;
  asistencia: Asistencia | null = null; // Usamos el modelo de Asistencia aquí
  alumnos: any[] = [];

  firebaseSvc = inject(FirebaseService);
  activatedRoute = inject(ActivatedRoute);

  constructor() {}

  async ngOnInit() {
    this.asistenciaId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Asistencia ID recibido:', this.asistenciaId);

    if (this.asistenciaId) {
      const asistencia = await this.firebaseSvc.obtenerDocumentoPorId('asistencias', this.asistenciaId);
      if (asistencia) {
        this.asistencia = asistencia as Asistencia; // Aseguramos el tipo explícitamente
        console.log('Asistencia:', this.asistencia);

        if (this.asistencia.usuarios && this.asistencia.usuarios.length > 0) {
          const usuarios = await Promise.all(
            this.asistencia.usuarios.map(async (usuarioId: string) => {
              const usuario = await this.firebaseSvc.obtenerDocumentoPorId('users', usuarioId);
              return usuario;
            })
          );
          this.alumnos = usuarios.filter(user => user !== null);
          console.log('Alumnos:', this.alumnos);
        } else {
          console.log('No hay alumnos en esta asistencia');
        }
      }
    } else {
      console.error('No se recibió el ID de la asistencia.');
    }
  }
}

