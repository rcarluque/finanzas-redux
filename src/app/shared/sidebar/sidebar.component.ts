import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { IngresoGastoService } from '../../services/ingreso-gasto.service';
import { AppState } from 'src/app/models/mainState.model';
import { getUser } from 'src/app/selectors/user.selector';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre: string;

  private subscription: Subscription = new Subscription();

  constructor(public ingresoGastoService: IngresoGastoService,
    public authService: AuthService,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select(getUser)
    .pipe( filter( data => data.data != null) )
    .subscribe( data => this.nombre = data.data.nombre);
  }

  logout() {
    this.authService.logout()
      .then( () => {
        this.router.navigate(['/login']);
        this.ingresoGastoService.cancelSubcriptions();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
