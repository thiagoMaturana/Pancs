import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceitasListPage } from './receitas-list.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ReceitasListPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReceitasListPage]
})
export class ReceitasListPageModule { }
