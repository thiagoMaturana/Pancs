import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlantaSavePage } from './planta-save.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: PlantaSavePage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlantaSavePage]
})
export class PlantaSavePageModule { }
