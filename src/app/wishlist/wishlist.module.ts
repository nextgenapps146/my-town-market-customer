import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
	  
import { IonicModule } from '@ionic/angular';

import { WishlistPageRoutingModule } from './wishlist-routing.module';

import { WishlistPage } from './wishlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,  
    WishlistPageRoutingModule
  ],
  declarations: [WishlistPage]
})
export class WishlistPageModule {}
