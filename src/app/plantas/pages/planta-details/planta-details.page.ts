import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Planta } from '../../models/planta.model';
import { take } from 'rxjs/operators';

import { PlantasService } from './../../services/plantas.service';
import { OverlayService } from './../../../core/services/overlay.service';

@Component({
  selector: 'app-planta-details',
  templateUrl: './planta-details.page.html',
  styleUrls: ['./planta-details.page.scss'],
})
export class PlantaDetailsPage {

  plantas$: Observable<Planta[]>;

  constructor(
    private plantasService: PlantasService,
    private overlayService: OverlayService
  ) { }

  async ionViewDidEnter(): Promise<void> {
    const loading = await this.overlayService.loading()
    this.plantas$ = this.plantasService.getAll();
    this.plantas$.pipe(take(1)).subscribe(plantas => loading.dismiss())
  }

}
