import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// ngrx
import { Store } from '@ngrx/store';
import { AppState } from '../models/mainState.model';
import { IngresoEgresoActions } from '../actions/ingreso-egreso.actions';
// models
import { IngresoEgreso } from '../models/ingreso-egreso.model';

import { AuthService } from './auth.service';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoGastoService {

  private subcriptions: Array<Subscription>;

  constructor(private authService: AuthService,
              private afStore: AngularFirestore,
              private ieActions: IngresoEgresoActions,
              private store: Store<AppState>) {
    this.subcriptions = [];
  }

  /**
   * Pasamos el Observable por un pipe para filtrar los objetos si cumplen
   * una condición. Es decir, solo continuará ejecutando el método (subscribe)
   * si se cumple la condición establecida en el pipe.
   */
  initIngresoEgresoListener() {
    this.subcriptions.push(
      this.store.select('usuario').pipe(
        filter( auth => auth.data != null)
      )
      .subscribe( auth => this.ingresoEgresoItems(auth.data.uid) )
    );
  }

  private ingresoEgresoItems(uid: string) {
    this.subcriptions.push(
      this.afStore.collection(`${uid}/ingresos-gastos/items`)
    /** Snapshot también devuelve un observable, pero nos envia información adicional referente al objeto
     * Filtramos por un pipe la información que nos devuelve. A su vez filtramos esa información devolviendo un nuevo
     * array (por cada elemento de firebase) el cual contiene un objeto */
      .snapshotChanges().pipe( map( afData => {
        return afData.map( doc => {
          return {
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data() // spread(...) asigna descripción con su valor
          };
        });
        })
      )
      .subscribe( (coleccion: any[]) => this.store.dispatch(this.ieActions.setItems(coleccion)) )
    );
  }

  cancelSubcriptions() {
    this.subcriptions.forEach( sub => sub.unsubscribe() );
    this.store.dispatch(this.ieActions.unsetItems());
  }

  crearIngresoEgreso(obj: IngresoEgreso) {
    const user = this.authService.getUsuario();

    return this.afStore.doc(`${user.uid}/ingresos-gastos`).collection('items')
      .add( {
        ...obj
      });
  }

  eliminarIngresoEgreso(uid: string) {
    const user = this.authService.getUsuario();

    return this.afStore.doc(`${user.uid}/ingresos-gastos/items/${uid}`).delete();
  }

}
