import { AuthGuard } from './../core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
        path: 'details/:id',
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
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantasRoutingModule { }
