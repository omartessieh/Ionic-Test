import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleitemPageRoutingModule } from './singleitem-routing.module';

import { SingleitemPage } from './singleitem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleitemPageRoutingModule
  ],
  declarations: [SingleitemPage]
})
export class SingleitemPageModule {}
