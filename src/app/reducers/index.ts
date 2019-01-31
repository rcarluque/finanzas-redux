import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../models/mainState.model';
import { uiReducer } from './ui.reducer';
import { userReducer } from './user.reducer';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';

export const reducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  usuario: userReducer,
  ingresoEgreso: ingresoEgresoReducer
}