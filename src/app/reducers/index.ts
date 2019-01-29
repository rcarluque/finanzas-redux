import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../models/mainState.model';
import { uiReducer } from './ui.reducer';
import { userReducer } from './user.reducer';

export const reducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  usuario: userReducer
}