import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router)

  // --Logear
  loading(){
  return this.loadingCtrl.create({ spinner: 'crescent'})
  }

  //--error
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  // enruta a cualquier pagina
  rutaLink(url: string){
    return this.router.navigateByUrl(url);
  }

  //guarda un elemento en localstorage
  guardarlocal(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value))
  }


  // obtiene elemento local
  obtenerlocal(key: string){
    return JSON.parse(localStorage.getItem(key))
  }
}
