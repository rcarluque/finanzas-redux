import { AlertError } from './alert.model';

export interface User {
  nombre: string;
  email: string;
  uid: string;
}

export interface UserState {
  data: User;
  error: AlertError;
}

// export class UserStore {
//   private nombre: string;
//   private email: string;
//   private uid: string;

//   constructor(obj: User) {
//     this.nombre = obj && obj.nombre || null;
//   }
// }
