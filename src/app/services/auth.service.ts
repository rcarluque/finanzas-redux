import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore,private router: Router) { }

  /**
   * Escucha cuando cambia el estado del usuario.
   */
  initAuthListener() {
    this.afAuth.authState.subscribe( fbUser => console.log(fbUser) );
  }

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
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then( resp => {
        const user: User = {
          uid: resp.user.uid,
          nombre: nombre,
          email: resp.user.email
        };

        this.afStore.doc(`${user.uid}/usuario`)
          .set(user)
          .then( () => this.router.navigate(['/']));
      });
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }


}
