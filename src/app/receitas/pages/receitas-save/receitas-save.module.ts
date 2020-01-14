import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceitasSavePage } from './receitas-save.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ReceitasSavePage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReceitasSavePage]
})
export class ReceitasSavePageModule { }
