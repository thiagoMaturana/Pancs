import { ReceitasService } from './../../services/receitas.service';
import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
=======
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
>>>>>>> testeIngredientes
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-receitas-save',
  templateUrl: './receitas-save.page.html',
  styleUrls: ['./receitas-save.page.scss'],
})
export class ReceitasSavePage implements OnInit {

  receitasForm: FormGroup;
  pageTitle = '. . .';
  receitaId: string = undefined;  
  ingredientes: FormArray;

  constructor(
    private fb: FormBuilder,
    private receitasService: ReceitasService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private overlayService: OverlayService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.init();
  }

  init(): void {
    const receitaId = this.route.snapshot.paramMap.get('id');
    if (!receitaId) {
      this.pageTitle = "Create receita";
      return;
    }
    this.receitaId = receitaId;
    this.pageTitle = 'Edit receita';
    this.receitasService.get(receitaId)
      .pipe(take(1))
      .subscribe(({ nome, ingredientes, modoDePreparo, observacao, tipo, photoUrl }) => {
        this.receitasForm.get('nome').setValue(nome);
        this.receitasForm.get('ingredientes').setValue(ingredientes);
        this.receitasForm.get('modoDePreparo').setValue(modoDePreparo);
        this.receitasForm.get('observacao').setValue(observacao);
        this.receitasForm.get('tipo').setValue(tipo);
        this.receitasForm.get('photoUrl').setValue(photoUrl);        
      })
  }

  private createForm(): void {
    this.receitasForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
<<<<<<< HEAD
      ingredientes: this.fb.array([
        this.initIngredientes()
      ]),
=======
      ingredientes: this.fb.array([ this.createIngrediente() ]),      
>>>>>>> testeIngredientes
      modoDePreparo: ['', [Validators.required]],
      observacao: [''],
      tipo: ['', [Validators.required]],
      photoUrl: ['', [Validators.required]]
    })
  }

<<<<<<< HEAD
  private initIngredientes(): FormGroup {
    return this.fb.group({
      nomeIngrediente: ['', [Validators.required, Validators.maxLength(2)]]
    })
  }

  private addIngrediente(): void {
    const control = <FormArray>this.receitasForm.controls.ingredientes;
    control.push(this.initIngredientes());
  }
  private removeIngrediente(i: number): void {
    const control = <FormArray>this.receitasForm.controls.ingredientes;
    control.removeAt(i);
  }
=======
  createIngrediente(): FormGroup {
    return this.fb.group({
      ingrediente: ''
    });
  }

  private addIngrediente(): void {
    this.ingredientes = this.receitasForm.get('ingredientes') as FormArray;
    this.ingredientes.push(this.createIngrediente());
  }
  private removeIngrediente(i: number): void {
    this.ingredientes = this.receitasForm.get('ingredientes') as FormArray;
    this.ingredientes.removeAt(i);
  }
  
>>>>>>> testeIngredientes
  async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading({
      message: 'Saving  . . .'
    });
    try {
      const receitas = !this.receitaId
        ? await this.receitasService.create(this.receitasForm.value)
        : await this.receitasService.update({
          id: this.receitaId,
          ...this.receitasForm.value
        })
      this.navCtrl.navigateBack('/receitas')
    } catch (error) {
      await this.overlayService.toast({
        message: error.message
      });
    } finally {
      loading.dismiss();
    }
  }
}

