import { ReceitasService } from './../../services/receitas.service';
import { Receita } from './../../models/receita.model';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-receitas-list',
  templateUrl: './receitas-list.page.html',
  styleUrls: ['./receitas-list.page.scss'],
})
export class ReceitasListPage {

  receitas$: Observable<Receita[]>;

  constructor(private receitasService: ReceitasService, private navCtrl: NavController,
    private overlayService: OverlayService) { }

  async ionViewDidEnter(): Promise<void> {
    const loading = await this.overlayService.loading()
    this.receitas$ = this.receitasService.getAll();
    this.receitas$.pipe(take(1)).subscribe(receitas => loading.dismiss())
  }

  onUpdate(receita: Receita): void {
    this.navCtrl.navigateForward(['receitas', 'edit', receita.id])
  }

  onDetails(receita: Receita): void {
    this.navCtrl.navigateForward(['receitas', 'details', receita.id]);
  }

  async onDelete(receita: Receita): Promise<void> {
    await this.overlayService.alert({
      message: `Do u really want delele the plant '${receita.nome}'?`,
      buttons: [
        {
          text: 'yes',
          handler: async () => {
            await this.receitasService.delete(receita);
            await this.overlayService.toast({
              message: `Receita "${receita.nome}" deleted!`
            })
          }
        },
        'No'
      ]
    });
  }
}
