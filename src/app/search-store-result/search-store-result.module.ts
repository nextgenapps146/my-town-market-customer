import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { IonicModule } from "@ionic/angular";

import { SearchStoreResultPageRoutingModule } from "./search-store-result-routing.module";

import { SearchStoreResultPage } from "./search-store-result.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SearchStoreResultPageRoutingModule,
  ],
  declarations: [SearchStoreResultPage],
})
export class SearchStoreResultPageModule {}
