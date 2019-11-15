import { PlantaItemComponent } from './planta-item/planta-item.component';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PlantaItemComponent],
  imports: [SharedModule],
  exports: [PlantaItemComponent]
})
export class ComponentsModule { }
