import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { OverlayService } from './../../../core/services/overlay.service';
import { PlantasService } from './../../services/plantas.service';
import { Planta } from '../../models/planta.model';

@Component({
  selector: 'app-planta-save',
  templateUrl: './planta-save.page.html',
  styleUrls: ['./planta-save.page.scss'],
})
export class PlantaSavePage implements OnInit {

  planta$: Observable<Planta>;
  plantasForm: FormGroup;
  pageTitle = '';
  plantaId: string = undefined;
  nomesPopulares: FormArray;

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
    console.log(this.plantaId);
    this.pageTitle = 'Edit planta';
    this.plantasService.get(plantaId)
      .pipe(take(1))
      .subscribe(({ nome, nomeCientifico, caracteristicas, folha, fruto, tamanho, origem, ordemPlanta, familiaPlanta, generoPlanta, especiePlanta, propriedades, avisos, cultivo, foto }) => {
        this.plantasForm.get('nome').setValue(nome);
        this.plantasForm.get('nomeCientifico').setValue(nomeCientifico);
        this.plantasForm.get('caracteristicas').setValue(caracteristicas);
        this.plantasForm.get('folha').setValue(folha);
        this.plantasForm.get('fruto').setValue(fruto);
        this.plantasForm.get('tamanho').setValue(tamanho);
        this.plantasForm.get('origem').setValue(origem);
        this.plantasForm.get('ordemPlanta').setValue(ordemPlanta);
        this.plantasForm.get('familiaPlanta').setValue(familiaPlanta);
        this.plantasForm.get('generoPlanta').setValue(generoPlanta);
        this.plantasForm.get('especiePlanta').setValue(especiePlanta);
        this.plantasForm.get('propriedades').setValue(propriedades);
        this.plantasForm.get('avisos').setValue(avisos);
        this.plantasForm.get('cultivo').setValue(cultivo);
        this.plantasForm.get('foto').setValue(foto);
      })
  }

  private createForm(): void {
    this.plantasForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      nomeCientifico: ['', [Validators.required, Validators.minLength(3)]],
      nomesPopulares: this.fb.array([this.createNomePopular()]),
      caracteristicas: ['', [Validators.required]],
      tamanho: ['', [Validators.required]],
      folha: ['', [Validators.required]],
      fruto: [''],
      origem: [''],
      ordemPlanta: [''],
      familiaPlanta: [''],
      generoPlanta: ['', [Validators.required]],
      especiePlanta: ['', [Validators.required]],
      propriedades: ['', [Validators.required]],
      avisos: [''],
      cultivo: [''],
      foto: ['', [Validators.required]]
    })
  }

  createNomePopular(): FormGroup {
    return this.fb.group({
      nomePopular: ['', [Validators.minLength(2)]]
    });
  }

  private addNomePopular(): void {
    this.nomesPopulares = this.plantasForm.get('nomesPopulares') as FormArray;
    this.nomesPopulares.push(this.createNomePopular());
  }
  private removeNomePopular(i: number): void {
    this.nomesPopulares = this.plantasForm.get('nomesPopulares') as FormArray;
    this.nomesPopulares.removeAt(i);
  }

  async onSubmit(): Promise<void> {
    console.log(this.plantasForm);
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
