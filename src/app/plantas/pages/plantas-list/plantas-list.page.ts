import { Component, OnInit } from '@angular/core';
import { PlantasService } from './../../services/plantas.service';
import { OverlayService } from './../../../core/services/overlay.service';
import { take } from 'rxjs/operators';

import { Observable, of } from 'rxjs';
import { Planta } from '../../models/planta.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-plantas-list',
  templateUrl: './plantas-list.page.html',
  styleUrls: ['./plantas-list.page.scss'],
})
export class PlantasListPage {

  plantas$: Observable<Planta[]>;

  constructor(private plantasService: PlantasService, private navCtrl: NavController,
    private overlayService: OverlayService) { }

  searchAction(searchItem: any) {
    const item = searchItem.target.value.toLowerCase();
    console.log(item);
  }

  async ionViewDidEnter(): Promise<void> {
    const loading = await this.overlayService.loading()
    this.plantas$ = this.plantasService.getAll();
    this.plantas$.pipe(take(1)).subscribe(plantas => loading.dismiss())
  }

  onUpdate(planta: Planta): void {
    this.navCtrl.navigateForward(['plantas', 'edit', planta.id])
  }

  onDetails(planta: Planta): void {
    this.navCtrl.navigateForward(['plantas', 'details', planta.name])
  }

  async onDelete(planta: Planta): Promise<void> {
    await this.overlayService.alert({
      message: `Do u really want delele the plant '${planta.name}'?`,
      buttons: [
        {
          text: 'yes',
          handler: async () => {
            await this.plantasService.delete(planta);
            await this.overlayService.toast({
              message: `Planta "${planta.name}" deleted!`
            })
          }
        },
        'No'
      ]
    });
  }
}
