import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { IonicModule } from "@ionic/angular";

import { ProductListRoutingModule } from "./product-list-routing.module";

import { ProductListPage } from "./product-list.page";
import { ComponentsModule } from "../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ComponentsModule,
    ProductListRoutingModule,
  ],
  declarations: [ProductListPage],
})
export class ProductListModule {}
