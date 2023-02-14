import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductitemsPage } from './productitems.page';

const routes: Routes = [
  {
    path: '',
    component: ProductitemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductitemsPageRoutingModule {}
