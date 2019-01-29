import { createSelector } from '@ngrx/store';
import { AppState } from '../models/mainState.model';
import { UserState } from '../models/user.model';

export const getMainState = (state: AppState) => state;

export const getUser = createSelector(getMainState, (state: AppState) => {
  return state.usuario;
});

export const getError = createSelector(
  getUser,
  (user: UserState) => user.error
);
