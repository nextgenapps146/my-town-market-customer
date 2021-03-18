import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchProductResultPage } from './search-product-result.page';

const routes: Routes = [
  {
    path: '',
    component: SearchProductResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchProductResultPageRoutingModule {}
