import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleitemPage } from './singleitem.page';

const routes: Routes = [
  {
    path: '',
    component: SingleitemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleitemPageRoutingModule {}
