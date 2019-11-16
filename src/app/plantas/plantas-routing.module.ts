import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        loadChildren: './pages/planta-save/planta-save.module#PlantaSavePageModule',
        canLoad: [AuthGuard]
      },
      {
        path: 'details/:name',
        loadChildren: './pages/planta-details/planta-details.module#PlantaDetailsPageModule',
        canLoad: [AuthGuard]
      },
      {
        path: 'edit/:id',
        loadChildren: './pages/planta-save/planta-save.module#PlantaSavePageModule',
        canLoad: [AuthGuard]
      },
      {
        path: '',
        loadChildren: './pages/plantas-list/plantas-list.module#PlantasListPageModule',
        canLoad: [AuthGuard]
      }
    ]
  },
  { path: 'create', loadChildren: './pages/planta-save/planta-save.module#PlantaSavePageModule' },
  { path: 'planta-details', loadChildren: './pages/planta-details/planta-details.module#PlantaDetailsPageModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantasRoutingModule { }
