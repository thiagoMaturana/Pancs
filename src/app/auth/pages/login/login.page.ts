import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { AuthService } from './../../../core/services/auth.service';
import { AuthProviders } from './../../../core/services/auth.types';
import { OverlayService } from './../../../core/services/overlay.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authProviders = AuthProviders;
  authForm: FormGroup;

  configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Create account'
  };

  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)])

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private overlayService: OverlayService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get name(): FormControl {
    return <FormControl>this.authForm.get('name');
  }
  get email(): FormControl {
    return <FormControl>this.authForm.get('email');
  }
  get password(): FormControl {
    return <FormControl>this.authForm.get('password');
  }

  changeAuthAction(): void {
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.action = isSignIn ? 'Login' : 'Sign Up';
    this.configs.actionChange = isSignIn ? 'Create account' : 'I already have an account'
    isSignIn
      ? this.authForm.removeControl('name')
      : this.authForm.addControl('name', this.nameControl);
  }

  async onSubmit(provider: AuthProviders): Promise<void> {
    const loading = await this.overlayService.loading();
    try {
      const credentials = await this.authService.authenticate({
        isSignIn: this.configs.isSignIn,
        user: this.authForm.value,
        provider
      });
      console.log('Authenticaded', credentials);
      this.navCtrl.navigateForward(this.route.snapshot.queryParamMap.get('redirect') || '/plantas');
    } catch (e) {
      console.log('Error', e);
      await this.overlayService.toast({
        message: e.message
      })
    } finally {
      loading.dismiss();
    }
  }
}
