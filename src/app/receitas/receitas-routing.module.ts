import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        loadChildren: './pages/receitas-save/receitas-save.module#ReceitasSavePageModule',
        canLoad: [AuthGuard]
      },
      {
        path: '',
        loadChildren: './pages/receitas-list/receitas-list.module#ReceitasListPageModule',
        canLoad: [AuthGuard]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceitasRoutingModule { }
