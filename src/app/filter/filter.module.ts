import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
   
import { IonicModule } from '@ionic/angular';

import { FilterPageRoutingModule } from './filter-routing.module';

import { FilterPage } from './filter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,   
    FilterPageRoutingModule
  ],
  declarations: [FilterPage]
})
export class FilterPageModule {}
