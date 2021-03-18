import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellerInfoPage } from './seller-info.page';

const routes: Routes = [
  {
    path: '',
    component: SellerInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerInfoPageRoutingModule {}
