import { Component, OnInit, inject } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular'; // Importa NavController
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc = inject(FirebaseService)
  utilsSvc = inject(UtilsService)

  userRol: string = '';

    // Listas de alumnos y materias
    public alertButtons = ['OK'];
    public alertInputs = [
      {
        placeholder: 'Asignatura',
      },
      {

        placeholder: 'Nickname (max 8 characters)',
        attributes: {
          maxlength: 8,
        },
      },
      {
        type: 'number',
        placeholder: 'Age',
        min: 1,
        max: 100,
      },
      {
        type: 'textarea',
        placeholder: 'A little about yourself',
      },
    ];

    alumnos: { nombre: string }[] = [
      { nombre: 'María Toloza' },
      { nombre: 'Pedro Perez' },
      { nombre: 'Ana Morales' },
    ];

    materias: { nombre: string }[] = [
      { nombre: 'Matemáticas' },
      { nombre: 'Ciencias' },
      { nombre: 'Historia' },
    ];

    constructor(private alertController: AlertController, private navCtrl: NavController) {}

  // Función para ver la asistencia del día


  ngOnInit() {
  }

  user(): User {
    return this.utilsSvc.obtenerlocal('user');
  }

  irAPaginaQR() {
    this.utilsSvc.rutaLink('verif/qr');
  }

  irATomarQR() {
    this.utilsSvc.rutaLink('verif/tomasis');
  }

  verAsistencia() {
    this.utilsSvc.rutaLink('verif/asistencias');
  }

}

  







