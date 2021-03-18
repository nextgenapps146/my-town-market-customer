import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentModePage } from './payment-mode.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentModePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentModePageRoutingModule {}
