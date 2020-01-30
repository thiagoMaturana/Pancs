import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OverlayService } from 'src/app/core/services/overlay.service';
import { ReceitasService } from '../../services/receitas.service';
import { Receita } from './../../models/receita.model';

@Component({
  selector: 'app-receita-details',
  templateUrl: './receita-details.page.html',
  styleUrls: ['./receita-details.page.scss'],
})
export class ReceitaDetailsPage {

  receita$: Observable<Receita>;

  constructor(
    private receitasService: ReceitasService,
    private overlayService: OverlayService,
    private route: ActivatedRoute
  ) { }

  async ionViewDidEnter(): Promise<void> {
    const loading = await this.overlayService.loading()
    const receitaId = this.route.snapshot.paramMap.get('id');
    this.receita$ = this.receitasService.get(receitaId);
    loading.dismiss();
  }

}
