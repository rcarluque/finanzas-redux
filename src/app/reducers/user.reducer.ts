import { Action } from '../models/redux.model';
import { userActions } from '../actions/user.actions';
import { UserState } from '../models/user.model';

const UserInitialState: UserState = {
  data: null,
  error: {}
};

export function userReducer(state: UserState = UserInitialState, action: Action) {
  switch (action.type) {
    case userActions.SET_USER:
      return {
        data: action.payload,
        error: {}
      };
    case userActions.UNSET_USER:
      return {
        data: null,
        error: {}
      };
    case userActions.SET_ERROR:
      return {
        ...state,
        error: {
          showAlert: true,
          texto: action.payload
        }
      };
    case userActions.UN_SET_ERROR:
      return {
        ...state,
        error: {
          showAlert: false
        }
      };
    default:
      return state;
  }
}

