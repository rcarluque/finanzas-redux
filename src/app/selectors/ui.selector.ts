import { createSelector } from '@ngrx/store';
import { AppState } from '../models/mainState.model';
import { UiState } from '../models/uiState.model';

export const getMainState = (state: AppState) => state;

export const getUi = createSelector(getMainState, (state: AppState) => {
  return state.ui;
});

export const getMessage = createSelector(
  getUi,
  (ui: UiState) => ui.showMessage
);
