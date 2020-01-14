import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceitaItemComponent } from './receita-item/receita-item.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ReceitaItemComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ReceitaItemComponent
  ]
})
export class ComponentsModule { }
