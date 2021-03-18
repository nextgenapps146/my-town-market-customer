import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchStorePage } from './search-store.page';

const routes: Routes = [
  {
    path: '',
    component: SearchStorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchStorePageRoutingModule {}
