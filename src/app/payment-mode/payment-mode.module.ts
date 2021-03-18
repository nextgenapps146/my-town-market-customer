import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { PaymentModePageRoutingModule } from './payment-mode-routing.module';

import { PaymentModePage } from './payment-mode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,   
    PaymentModePageRoutingModule
  ],
  declarations: [PaymentModePage]
})
export class PaymentModePageModule {}
