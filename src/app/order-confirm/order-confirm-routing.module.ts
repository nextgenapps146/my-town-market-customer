import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderConfirmPage } from './order-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: OrderConfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderConfirmPageRoutingModule {}
