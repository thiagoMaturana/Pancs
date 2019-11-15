import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { OverlayService } from './../../../core/services/overlay.service';
import { PlantasService } from './../../services/plantas.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-planta-save',
  templateUrl: './planta-save.page.html',
  styleUrls: ['./planta-save.page.scss'],
})
export class PlantaSavePage implements OnInit {

  plantasForm: FormGroup;
  pageTitle = '. . .';
  plantaId: string = undefined;

  constructor(
    private fb: FormBuilder,
    private plantasService: PlantasService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private overlayService: OverlayService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.init();
  }

  init(): void {
    const plantaId = this.route.snapshot.paramMap.get('id');
    if (!plantaId) {
      this.pageTitle = "Create planta";
      return;
    }
    this.plantaId = plantaId;
    this.pageTitle = 'Edit planta';
    this.plantasService.get(plantaId)
      .pipe(take(1))
      .subscribe(({ title, done }) => {
        this.plantasForm.get('title').setValue(title);
        this.plantasForm.get('done').setValue(done);
      })
  }

  private createForm(): void {
    this.plantasForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      done: [false]
    })
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading({
      message: 'Saving  . . .'
    });
    try {
      const plantas = !this.plantaId
        ? await this.plantasService.create(this.plantasForm.value)
        : await this.plantasService.update({
          id: this.plantaId,
          ...this.plantasForm.value
        })
      this.navCtrl.navigateBack('/plantas')
    } catch (error) {
      await this.overlayService.toast({
        message: error.message
      });
    } finally {
      loading.dismiss();
    }
  }
}
