import { Component } from '@angular/core';
import { PlantasService } from './../../services/plantas.service';
import { OverlayService } from './../../../core/services/overlay.service';
import { take } from 'rxjs/operators';

import { Observable } from 'rxjs';
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
    const filtro = searchItem.target.value;

    this.plantas$ = this.plantasService.findBy(filtro);
    this.plantas$.pipe(take(1)).subscribe(plantas => console.log(filtro));
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
    this.navCtrl.navigateForward(['plantas', 'details', planta.id]);
  }

  async onDelete(planta: Planta): Promise<void> {
    await this.overlayService.alert({
      message: `Do u really want delele the plant '${planta.nome}'?`,
      buttons: [
        {
          text: 'yes',
          handler: async () => {
            await this.plantasService.delete(planta);
            await this.overlayService.toast({
              message: `Planta "${planta.nome}" deleted!`
            })
          }
        },
        'No'
      ]
    });
  }
}
