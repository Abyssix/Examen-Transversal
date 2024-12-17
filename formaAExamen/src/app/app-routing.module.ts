import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AlumnosPage } from './pages/verif/alumnos/alumnos.page';  // Asegúrate de importar AlumnosPage

const routes: Routes = [
  {
    path: '',
    redirectTo: 'verif',
    pathMatch: 'full'
  },
  {
    path: 'verif',
    loadChildren: () => import('./pages/verif/verif.module').then( m => m.VerifPageModule)
  },
  {
    path: 'verif/alumnos/:id', // Ruta dinámica para los alumnos
    component: AlumnosPage
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
