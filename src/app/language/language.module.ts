import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
	
import { IonicModule } from '@ionic/angular';

import { LanguagePageRoutingModule } from './language-routing.module';

import { LanguagePage } from './language.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,   
    LanguagePageRoutingModule
  ],
  declarations: [LanguagePage]
})
export class LanguagePageModule {}
