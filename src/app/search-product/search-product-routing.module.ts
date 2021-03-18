import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchProductPage } from './search-product.page';

const routes: Routes = [
  {
    path: '',
    component: SearchProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchProductPageRoutingModule {}
