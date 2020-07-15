import { AngularFirestore } from '@angular/fire/firestore';
import { Receita } from './../models/receita.model';
import { Firestore } from 'src/app/core/classses/firestore.class';
import { Injectable } from '@angular/core';
import { firestore } from 'firebase';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReceitasService extends Firestore<Receita>{

  constructor(db: AngularFirestore, private authService: AuthService) {
    super(db);
    this.init();
  }

  private init(): void {
    this.authService.authState$.subscribe(
      user => {
        if (user) {
          this.setCollection(`/users/${user.uid}/receitas`, (ref: firestore.CollectionReference) => {
            return ref.orderBy('nome', 'asc');
          });
          return;
        }
        this.setCollection(null);
      }
    )
  }
}
