import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { IonicModule } from "@ionic/angular";

import { SearchStorePageRoutingModule } from "./search-store-routing.module";

import { SearchStorePage } from "./search-store.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SearchStorePageRoutingModule,
  ],
  declarations: [SearchStorePage],
})
export class SearchStorePageModule {}
