import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { LocationPagePageRoutingModule } from './location-routing.module';

import { LocationPage } from './location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    LocationPagePageRoutingModule
  ],
  declarations: [LocationPage]
})
export class LocationPageModule {}
