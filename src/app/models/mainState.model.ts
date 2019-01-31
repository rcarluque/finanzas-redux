import { UiState } from './uiState.model';
import { UserState } from './user.model';
import { IngresoEgresoState } from './ingreso-egreso.model';

export interface AppState {
  ui: UiState;
  usuario: UserState;
  ingresoEgreso: IngresoEgresoState;
}