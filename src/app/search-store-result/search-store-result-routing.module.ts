import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchStoreResultPage } from './search-store-result.page';

const routes: Routes = [
  {
    path: '',
    component: SearchStoreResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchStoreResultPageRoutingModule {}
