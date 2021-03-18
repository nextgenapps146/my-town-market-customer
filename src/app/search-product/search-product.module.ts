import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { IonicModule } from "@ionic/angular";

import { SearchProductPageRoutingModule } from "./search-product-routing.module";

import { SearchProductPage } from "./search-product.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SearchProductPageRoutingModule,
  ],
  declarations: [SearchProductPage],
})
export class SearchProductPageModule {}
