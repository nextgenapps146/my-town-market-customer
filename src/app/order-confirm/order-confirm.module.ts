import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { OrderConfirmPageRoutingModule } from './order-confirm-routing.module';

import { OrderConfirmPage } from './order-confirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,   
    OrderConfirmPageRoutingModule
  ],
  declarations: [OrderConfirmPage]
})
export class OrderConfirmPageModule {}
