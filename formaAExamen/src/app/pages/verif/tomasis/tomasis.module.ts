import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { TomasisPageRoutingModule } from './tomasis-routing.module';
import { TomasisPage } from './tomasis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZXingScannerModule,  // Ensure ZXingScannerModule is imported here
    TomasisPageRoutingModule
  ],
  declarations: [TomasisPage]
})
export class TomasisPageModule {}
