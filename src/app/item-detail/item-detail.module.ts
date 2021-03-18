import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
	
import { IonicModule } from '@ionic/angular';

import { ItemDetailPageRoutingModule } from './item-detail-routing.module';

import { ItemDetailPage } from './item-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,    
    ItemDetailPageRoutingModule
  ],
  declarations: [ItemDetailPage]
})
export class ItemDetailPageModule {}
