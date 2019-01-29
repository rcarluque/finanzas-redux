import { Action } from '../models/redux.model';
import { userActions } from '../actions/user.actions';
import { UserState } from '../models/user.model';

const UserInitialState: UserState = {
  data: null,
  error: {
    hasError: false
  }
};

export function userReducer(state: UserState = UserInitialState, action: Action) {
  switch (action.type) {
    case userActions.SET_USER:
      return {
        ...state,
        data: action.payload
      };
    case userActions.SET_ERROR:
      return {
        ...state,
        error: {
          hasError: true,
          texto: action.payload
        }
      };
    case userActions.UN_SET_ERROR:
      return {
        ...state,
        error: {
          hasError: false
        }
      };
    default:
      return state;
  }
}

