import { createSelector } from '@ngrx/store';
import { AppState } from '../models/mainState.model';
import { IngresoEgresoState } from '../models/ingreso-egreso.model';

export const getMainState = (state: AppState) => state;

export const getIngresoEgreso = createSelector(getMainState, (state: AppState) => {
  return state.ingresoEgreso;
});

export const getItems = createSelector(
  getIngresoEgreso,
  (ingresoEgreso: IngresoEgresoState) => ingresoEgreso.items
);
