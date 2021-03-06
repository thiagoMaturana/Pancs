import { AuthService } from './core/services/auth.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  pages: { url: string; direction: string; title: string; icon: string }[];

  user: firebase.User;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.pages = [
      { url: '/plantas', direction: 'back', icon: 'leaf', title: 'Plantas' },
      { url: '/plantas/create', direction: 'forward', icon: 'add', title: 'New Planta' },
      { url: '/receitas', direction: 'forward', icon: 'pizza', title: 'Receitas' },
      { url: '/receitas/create', direction: 'forward', icon: 'add', title: 'New Receitas' }
    ];

    this.authService.authState$.subscribe(user => this.user = user);

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
