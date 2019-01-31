import { Injectable } from '@angular/core';
import { Action } from '../models/redux.model';


export const actions = {
  ACTIVAR_LOADING: '[UI Loading] Cargando...',
  DESACTIVAR_LOADING: '[UI Loading] Fin de carga...',
  SHOW_ALERT: '[UI Mensaje] Mostrando alerta...',
  QUIT_ALERT: '[UI Mensaje] Quitando la alerta...'
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

  showAlert(mensaje: string): Action {
    return {
      type: actions.SHOW_ALERT,
      payload: mensaje
    };
  }

  quitMensaje() {
    return {
      type: actions.QUIT_ALERT
    }
  }

}
