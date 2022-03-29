import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchasedTrainingsPage } from './purchased-trainings.page';

const routes: Routes = [
  {
    path: '',
    component: PurchasedTrainingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchasedTrainingsPageRoutingModule {}
