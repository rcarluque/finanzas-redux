import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Action } from '../models/redux.model';

export const userActions = {
  SET_USER: '[USER] Set User'
};

@Injectable({
  providedIn: 'root'
})
export class UserActions {

  setUser(usuario: User): Action {
    return {
      type: userActions.SET_USER,
      payload: usuario
    };
  }

}