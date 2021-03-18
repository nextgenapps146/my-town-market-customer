import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { IonicModule } from "@ionic/angular";
import { AddItemComponent } from "./add-item/add-item.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule
  ],
  declarations: [
    AddItemComponent
  ],
  exports: [
    AddItemComponent
  ]
})
export class ComponentsModule {}
