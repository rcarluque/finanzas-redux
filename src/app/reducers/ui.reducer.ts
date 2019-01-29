import { Action } from '@ngrx/store';
import { actions } from '../actions/ui.actions';
import { UiState } from '../models/uiState.model';

const initState: UiState = {
  isLoading: false
};

export function uiReducer(state = initState, action: Action): UiState {
  switch (action.type) {
    case actions.ACTIVAR_LOADING:
      return {
        isLoading: true
      };
    case actions.DESACTIVAR_LOADING:
        return {
          isLoading: false
        };
    default:
      return state;
  }
}
