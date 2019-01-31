import { actions } from '../actions/ui.actions';
import { UiState } from '../models/uiState.model';
import { Action } from '../models/redux.model';

const initState: UiState = {
  isLoading: false,
  showMessage: {}
};

export function uiReducer(state = initState, action: Action): UiState {
  switch (action.type) {
    case actions.ACTIVAR_LOADING:
      return {
        isLoading: true,
        showMessage: {}
      };
    case actions.DESACTIVAR_LOADING:
      return {
        isLoading: false,
        showMessage: {}
      };
    case actions.SHOW_ALERT:
      return {
        ...state,
        showMessage: {
          showAlert: true,
          texto: action.payload
        }
      };
    case actions.QUIT_ALERT:
    return {
      ...state,
      showMessage: {}
    };
    default:
      return state;
  }
}
