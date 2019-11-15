import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { ElementSchemaRegistry } from '@angular/compiler';

export abstract class Firestore<T extends { id: string }> {
  protected colletion: AngularFirestoreCollection<T>;

  constructor(protected db: AngularFirestore) { }

  protected setCollection(path: string, querFn?: QueryFn): void {
    this.colletion = path ? this.db.collection(path, querFn) : null;
  }

  private setItem(item: T, operation: 'set' | 'update'): Promise<T> {
    return this.colletion
      .doc<T>(item.id)
    [operation](item)
      .then(() => item)
  }

  getAll(): Observable<T[]> {
    return this.colletion.valueChanges();
  }

  get(id: string): Observable<T> {
    return this.colletion.doc<T>(id).valueChanges();
  }

  create(item: T): Promise<T> {
    item.id = this.db.createId();
    return this.setItem(item, 'set');
  }

  update(item: T): Promise<T> {
    return this.setItem(item, 'update');
  }

  delete(item: T): Promise<void> {
    return this.colletion.doc<T>(item.id).delete();
  }

}
