import { Injectable } from '@angular/core';
import { Action } from '../models/redux.model';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export const actions = {
  SET_ITEMS: '[Ingreso-Egreso] Añadiendo ingreso-egreso',
  UNSET_ITEMS: '[Ingreso-Egreso] Vaciando ingreso-egreso',
};

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoActions {

  setItems(items: IngresoEgreso[]): Action {
    return {
      type: actions.SET_ITEMS,
      payload: items
    };
  }

  unsetItems(): Action {
    return {
      type: actions.UNSET_ITEMS
    };
  }

}