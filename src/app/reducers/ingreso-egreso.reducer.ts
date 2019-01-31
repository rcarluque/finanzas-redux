import { IngresoEgresoState } from '../models/ingreso-egreso.model';
import { Action } from '../models/redux.model';
import { actions } from '../actions/ingreso-egreso.actions';

const initState: IngresoEgresoState = {
  items: null
};

export function ingresoEgresoReducer(state = initState, action: Action): IngresoEgresoState {
  switch (action.type) {
    case actions.SET_ITEMS:
      return {
        // Por cuestiones de seguridad es mejor destruir el contenido del array
        // y regresar un nuevo estado. Al usar map, recorremos todos y devolvemos un nuevo elemento
        items: [
          ...action.payload.map( item => {
            return {...item};
          })
        ]
      };
    case actions.UNSET_ITEMS:
      return {
        items: []
      };
    default:
      return state;
  }
}
