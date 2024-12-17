import { Component, OnInit, inject } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-recu-pass',
  templateUrl: './recu-pass.page.html',
  styleUrls: ['./recu-pass.page.scss'],
})
export class RecuPassPage implements OnInit {


  constructor(private router: Router) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  firebaseSvc = inject(FirebaseService)
  utilsSvc = inject(UtilsService)

  ngOnInit() {
  }

  async submit() {
    if(this.form.valid){

        const loading = await this.utilsSvc.loading();
        await loading.present();

        this.firebaseSvc.correoderecuperacion(this.form.value.email).then(res => {
            // Mostrar el toast indicando que el correo fue enviado
          this.utilsSvc.presentToast({
            message: 'Te hemos enviado un correo para recuperar tu contraseña.',
            duration: 3000, // Duración de 3 segundos
            color: 'success',
            position: 'top',
          });

          // Redirigir al usuario después de 3 segundos a la página de verificación
          setTimeout(() => {
            this.router.navigateByUrl('/verif'); // Redirige a la página de verificación
          }, 5000); // Espera 3 segundos

          
        }).catch(error => {
          console.log(error);

          this.utilsSvc.presentToast({
            message: error.message,
            duration: 2500,
            color: 'primary',
            position: 'middle',
            icon: 'alert-circle-outline'
          })

        }).finally(() => {
          loading.dismiss();
        })

    }
  }


}

