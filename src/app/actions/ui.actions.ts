import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

export const actions = {
  ACTIVAR_LOADING: '[UI Loading] Cargando...',
  DESACTIVAR_LOADING: '[UI Loading] Fin de carga...',

};

@Injectable({
  providedIn: 'root'
})
export class UiActions {

  activarLoading(): Action {
    return {
      type: actions.ACTIVAR_LOADING
    };
  }

  desctivarLoading(): Action {
    return {
      type: actions.DESACTIVAR_LOADING
    };
  }

}