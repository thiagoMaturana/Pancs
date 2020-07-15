import { Receita } from './../../models/receita.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-receita-item',
  templateUrl: './receita-item.component.html',
  styleUrls: ['./receita-item.component.scss'],
})
export class ReceitaItemComponent {

  @Input() receita: Receita;

  @Output() update = new EventEmitter<Receita>();
  @Output() delete = new EventEmitter<Receita>();

}
