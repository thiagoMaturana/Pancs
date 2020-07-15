import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Planta } from '../../models/planta.model';

@Component({
  selector: 'app-planta-item',
  templateUrl: './planta-item.component.html',
  styleUrls: ['./planta-item.component.scss'],
})
export class PlantaItemComponent {

  @Input() planta: Planta;

  @Output() update = new EventEmitter<Planta>();
  @Output() delete = new EventEmitter<Planta>();

}
