import { Action } from '../models/redux.model';
import { userActions } from '../actions/user.actions';
import { UserState } from '../models/user.model';

const UserInitialState: UserState = {
  data: null,
  error: false
};

export function userReducer(state: UserState = UserInitialState, action: Action) {
  switch (action.type) {
    case userActions.SET_USER:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}

