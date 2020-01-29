import { ReceitasService } from './../../services/receitas.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { NavController, NavParams } from '@ionic/angular';
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

  constructor(
    private fb: FormBuilder,
    private receitasService: ReceitasService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private overlayService: OverlayService
  ) {
    // Define the FormGroup object for the form
   // (with sub-FormGroup objects for handling
   // the dynamically generated form input fields)
   this.receitasForm = this.fb.group({
      technologies     : this.fb.array([
       this.initIngredientesFields()
    ])
 });
   }

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

  /**
 * Generates a FormGroup object with input field validation rules for
 * the technologies form object
 *
 * @public
 * @method initIngredientesFields
 * @return {FormGroup}
 */
  initIngredientesFields() : FormGroup
  {
    return this.fb.group({
        name : ['', Validators.required]
    });
  }

  /**
 * Programmatically generates a new technology input field
 *
 * @public
 * @method addNewInputField
 * @return {none}
 */
addNewInputField() : void
{
   const control = <FormArray>this.receitasForm.controls.ingredientes;
   control.push(this.initIngredientesFields());
}

  private createForm(): void {
    this.receitasForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      ingredientes: ['', [Validators.required, Validators.minLength(3)]],
      modoDePreparo: ['', [Validators.required]],
      observacao: [''],
      tipo: ['', [Validators.required]],
      photoUrl: ['', [Validators.required]]
    })
  }

/**
 * Programmatically removes a recently generated technology input field
 *
 * @public
 * @method removeInputField
 * @param i    {number}      The position of the object in the array that needs to removed
 * @return {none}
 */
removeInputField(i : number) : void
{
   const control = <FormArray>this.receitasForm.controls.ingredientes;
   control.removeAt(i);
}

/**
 * Receive the submitted form data
 *
 * @public
 * @method manage
 * @param val    {object}      The posted form data
 * @return {none}
 */
manage(val : any) : void
{
   console.dir(val);
}

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

