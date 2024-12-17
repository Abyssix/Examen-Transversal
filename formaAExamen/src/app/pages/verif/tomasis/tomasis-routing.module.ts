import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TomasisPage } from './tomasis.page';

const routes: Routes = [
  {
    path: '',
    component: TomasisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TomasisPageRoutingModule {}
