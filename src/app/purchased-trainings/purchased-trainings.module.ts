import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchasedTrainingsPageRoutingModule } from './purchased-trainings-routing.module';

import { PurchasedTrainingsPage } from './purchased-trainings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchasedTrainingsPageRoutingModule
  ],
  declarations: [PurchasedTrainingsPage]
})
export class PurchasedTrainingsPageModule {}
