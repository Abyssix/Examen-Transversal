import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Asistencia } from 'src/app/models/asistencia.model';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  asistencias: Asistencia[] = [];  // Aquí se guardarán las asistencias obtenidas de Firebase
  router = inject(Router);
  utilsSvc = inject(UtilsService);

  constructor() {}

  async ngOnInit() {
    try {
      // Obtén todas las asistencias de la colección
      this.asistencias = await this.firebaseSvc.obtenerColeccion('asistencias');
      console.log("Asistencias obtenidas:", this.asistencias);
    } catch (error) {
      console.error("Error al obtener las asistencias:", error);
    }
  }

  user(): User {
    return this.utilsSvc.obtenerlocal('user');
  }

  verAlumnos(asistencia: Asistencia) {
    console.log('Redirigiendo con ID:', asistencia.uid);  // Asegúrate de que el ID se imprime aquí
    if (asistencia.uid) {
      this.router.navigate(['verif/alumnos', asistencia.uid]);  // Navega pasando el 'uid'
    } else {
      console.error('Asistencia no tiene un UID.');
    }
  }
  
  
}
