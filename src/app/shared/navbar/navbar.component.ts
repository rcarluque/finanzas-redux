import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../models/mainState.model';
import { getUser } from '../../selectors/user.selector';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  nombre: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select(getUser)
    .pipe( filter( data => data.data != null) )
    .subscribe( data => this.nombre = data.data.nombre);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
