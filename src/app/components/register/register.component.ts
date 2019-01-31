import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/mainState.model';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  cargando: boolean;

  constructor(public authService: AuthService, public store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading);
  }

  onSubmit(data: any) {
    this.authService.crearUsuario(data.nombre, data.email, data.password);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
