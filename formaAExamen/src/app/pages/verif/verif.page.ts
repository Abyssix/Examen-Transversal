import { Component, OnInit, inject } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-verif',
  templateUrl: './verif.page.html',
  styleUrls: ['./verif.page.scss'],
})
export class VerifPage implements OnInit {

  constructor(private router: Router) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  firebaseSvc = inject(FirebaseService)
  utilsSvc = inject(UtilsService)

  ngOnInit() {
  }

  async submit() {
    if(this.form.valid){

        const loading = await this.utilsSvc.loading();
        await loading.present();

        this.firebaseSvc.ingresar(this.form.value as User).then(res => {

          this.obteneruserinfo(res.user.uid);
          
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

  async obteneruserinfo(uid: string) {
    if(this.form.valid){

        const loading = await this.utilsSvc.loading();
        await loading.present();

        let path = `users/${uid}`;
        delete this.form.value.password;

        this.firebaseSvc.obtenerDocumentologin(path).then((user: User) => {

          this.utilsSvc.guardarlocal('user', user);
          this.utilsSvc.rutaLink('/verif/home');
          this.form.reset();
          
          this.utilsSvc.presentToast({
            message: `Te damos la bienvenida ${user.name}`,
            duration: 2500,
            color: 'primary',
            position: 'middle',
            icon: 'person-circle-outline'
          })

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
