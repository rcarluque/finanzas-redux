import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// NgRx
import { Store } from '@ngrx/store';
import { AppState } from '../models/mainState.model';

import { User } from '../models/user.model';
// AngularFire
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { UiActions } from '../actions/ui.actions';
import { UserActions } from '../actions/user.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuario: User;

  private userSubcription: Subscription = new Subscription();

  constructor(private afAuth: AngularFireAuth,
              private afStore: AngularFirestore,
              private router: Router,
              private store: Store<AppState>,
              private uiActions: UiActions,
              private userActions: UserActions) { }

  /**
   * Escucha cuando cambia el estado del usuario.
   */
  initAuthListener() {
    this.afAuth.authState.subscribe( fbUser => {
      if (fbUser) {
        this.userSubcription = this.afStore.doc(`${fbUser.uid}/usuario`).valueChanges()
        .subscribe( (usuarioObj: User) => {

          const newUser: User = {
            nombre: usuarioObj.nombre,
            email: usuarioObj.email,
            uid: usuarioObj.uid
          };

          this.store.dispatch(this.userActions.setUser(newUser));
          this.usuario = newUser;
        });
      } else {
        this.usuario = null;
        this.userSubcription.unsubscribe();
      }
    });
  }

  /**
   * En caso de que usuario fuese un Objeto (clase)
   * Tenemos que extraer todos los valores que usuario,
   * pero para enviar solo las propiedades de este.
   * (Código comentado).
   */
  getUsuario() {
    // return {...this.usuario};
    return this.usuario;
  }

  /**
   * Comprueba si el usuario está autenticado.
   */
  isAuth() {
    return this.afAuth.authState.pipe(
      map( fbUser => {
        if (fbUser == null) {
          this.router.navigate(['/login']);
        }

        return fbUser != null;
      })
    );
  }

  crearUsuario(nombre: string, email: string, password: string) {
    this.store.dispatch(this.uiActions.activarLoading());

    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then( resp => {
        const user: User = {
          uid: resp.user.uid,
          nombre: nombre,
          email: resp.user.email
        };

        this.afStore.doc(`${user.uid}/usuario`)
          .set(user)
          .then( () => {
            this.router.navigate(['/']);
            this.store.dispatch(this.userActions.unSetError());
            this.store.dispatch(this.uiActions.desctivarLoading());
          });
      })
      .catch( error => {
        this.store.dispatch(this.userActions.setError(error.message));
        this.store.dispatch(this.uiActions.desctivarLoading());
      });
  }

  login(email: string, password: string) {
    this.store.dispatch(this.uiActions.activarLoading());
    // serv
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then( () => {
          this.router.navigate(['/']);
          this.store.dispatch(this.userActions.unSetError());
          this.store.dispatch(this.uiActions.desctivarLoading());
        })
        .catch( error => {
          this.store.dispatch(this.userActions.setError(error.message));
          this.store.dispatch(this.uiActions.desctivarLoading());
        });
  }

  logout() {
    this.store.dispatch(this.userActions.unsetUser());
    return this.afAuth.auth.signOut();
  }


}
