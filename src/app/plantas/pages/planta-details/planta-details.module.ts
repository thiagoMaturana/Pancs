import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlantaDetailsPage } from './planta-details.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: PlantaDetailsPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [PlantaDetailsPage]
})
export class PlantaDetailsPageModule { }
