import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Planta } from '../../models/planta.model';

import { PlantasService } from './../../services/plantas.service';
import { OverlayService } from './../../../core/services/overlay.service';

@Component({
  selector: 'app-planta-details',
  templateUrl: './planta-details.page.html',
  styleUrls: ['./planta-details.page.scss'],
})
export class PlantaDetailsPage {

  planta$: Observable<Planta>;
  segmentPage = "descricao";
  segmentDescricaoPage = "caracteristicas";

  constructor(
    private plantasService: PlantasService,
    private overlayService: OverlayService,
    private route: ActivatedRoute
  ) { }

  async ionViewDidEnter(): Promise<void> {
    const loading = await this.overlayService.loading()
    const plantaId = this.route.snapshot.paramMap.get('id');
    this.planta$ = this.plantasService.get(plantaId);
    console.log(this.planta$);
    loading.dismiss();

  }

  segmentChanged(ev: any) {
    this.segmentPage = ev.detail.value;
    this.segmentDescricaoPage = "caracteristicas"; //meia boca, tentar melhorar. Quando vamos para outro segmento diferente da Descrição, e antes vamos para a Classificação, e quando voltamos o segmento vai para o padrão que é a Caracteristica, mas o conteúdo é da Classificação.
  }

  segmentDescricaoChanged(ev: any) {
    console.log(ev.detail);
    this.segmentDescricaoPage = ev.detail.value;
  }
}
