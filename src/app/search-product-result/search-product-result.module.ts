import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { IonicModule } from "@ionic/angular";

import { SearchProductResultPageRoutingModule } from "./search-product-result-routing.module";

import { SearchProductResultPage } from "./search-product-result.page";
import { ComponentsModule } from "../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ComponentsModule,
    SearchProductResultPageRoutingModule,
  ],
  declarations: [SearchProductResultPage],
})
export class SearchProductResultPageModule {}
