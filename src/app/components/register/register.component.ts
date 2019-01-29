import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/mainState.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  cargando: boolean;

  constructor(public authService: AuthService, public store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading);
  }

  onSubmit(data: any) {
    this.authService.crearUsuario(data.nombre, data.email, data.password);
  }

}
