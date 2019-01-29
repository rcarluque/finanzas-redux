import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Action } from '../models/redux.model';

export const userActions = {
  SET_USER: '[USER] Set User',
  SET_ERROR: '[USER] Set Error',
  UN_SET_ERROR: '[USER] UnSet Error'
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

  setError(texto: string): Action {
    return {
      type: userActions.SET_ERROR,
      payload: texto
    };
  }

  unSetError(): Action {
    return {
      type: userActions.UN_SET_ERROR
    };
  }

}