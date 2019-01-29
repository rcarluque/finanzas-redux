import { UiState } from './uiState.model';
import { UserState } from './user.model';

export interface AppState {
  ui: UiState;
  usuario: UserState;
}