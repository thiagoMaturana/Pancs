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

  constructor(
    private plantasService: PlantasService,
    private overlayService: OverlayService,
    private route: ActivatedRoute
  ) { }

  async ionViewDidEnter(): Promise<void> {
    const loading = await this.overlayService.loading()
    const plantaId = this.route.snapshot.paramMap.get('id');
    this.planta$ = this.plantasService.get(plantaId);
    loading.dismiss();
  }

}
