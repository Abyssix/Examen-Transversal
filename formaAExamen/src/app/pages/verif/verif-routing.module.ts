import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnosPage } from './alumnos/alumnos.page';
import { VerifPage } from './verif.page';

const routes: Routes = [
  {
    path: '',
    component: VerifPage
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'qr',
    loadChildren: () => import('./qr/qr.module').then( m => m.QrPageModule)
  },
  {
    path: 'recu-pass',
    loadChildren: () => import('./recu-pass/recu-pass.module').then( m => m.RecuPassPageModule)
  },
  {
    path: 'tomasis',
    loadChildren: () => import('./tomasis/tomasis.module').then( m => m.TomasisPageModule)
  },
  {
    path: 'asistencias',
    loadChildren: () => import('./asistencias/asistencias.module').then( m => m.AsistenciasPageModule)
  },
  {
    path: 'alumnos',
    loadChildren: () => import('./alumnos/alumnos.module').then( m => m.AlumnosPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifPageRoutingModule {}
