import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlantasListPage } from './plantas-list.page';

const routes: Routes = [
  {
    path: '',
    component: PlantasListPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlantasListPage]
})
export class PlantasListPageModule { }
