import { OverlayService } from './../../../core/services/overlay.service';
import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from './../../../core/services/auth.service';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-logout-button',
  template: `
    <ion-buttons>
      <ion-button (click)="logout()">
        <ion-icon name="exit" slot="icon-only"></ion-icon>
      </ion-button>
    </ion-buttons>
  `
})
export class LogoutButtonComponent implements OnInit {
  @Input() menu: string;

  constructor(
    private authService: AuthService,
    private navController: NavController,
    private overlayService: OverlayService,
    private menuCtrl: MenuController
  ) { }

  async ngOnInit(): Promise<void> {
    if (!(await this.menuCtrl.isEnabled(this.menu))) {
      this.menuCtrl.enable(true, this.menu)
    }
  }

  async logout(): Promise<void> {
    await this.overlayService.alert({
      message: 'Do u really want to quit?',
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            await this.authService.logout();
            await this.menuCtrl.enable(false, this.menu)
            this.navController.navigateRoot('/login');
          }
        },
        'No'
      ]
    })
  }

}
