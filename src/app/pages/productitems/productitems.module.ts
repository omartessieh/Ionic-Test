import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductitemsPageRoutingModule } from './productitems-routing.module';

import { ProductitemsPage } from './productitems.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductitemsPageRoutingModule
  ],
  declarations: [ProductitemsPage]
})
export class ProductitemsPageModule {}
