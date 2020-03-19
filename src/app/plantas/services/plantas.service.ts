import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from './../../core/services/auth.service';
import { Firestore } from 'src/app/core/classses/firestore.class';
import { Planta } from '../models/planta.model';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PlantasService extends Firestore<Planta>{

  constructor(private authService: AuthService, db: AngularFirestore) {
    super(db);
    this.init();
  }

  private init(): void {
    this.authService.authState$.subscribe(
      user => {
        if (user) {
          this.setCollection(`/plantas`, (ref: firestore.CollectionReference) => {
            return ref.orderBy('name', 'asc');
          });
          return;
        }
        this.setCollection(null);
      }
    )
  }
}
