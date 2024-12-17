import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuPassPageRoutingModule } from './recu-pass-routing.module';

import { RecuPassPage } from './recu-pass.page';
import { UiModule } from 'src/app/ui/ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuPassPageRoutingModule,
    UiModule
  ],
  declarations: [RecuPassPage]
})
export class RecuPassPageModule {}
