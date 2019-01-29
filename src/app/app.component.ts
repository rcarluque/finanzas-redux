import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './services/auth.service';
import { AppState } from './models/mainState.model';
import { UserActions } from './actions/user.actions';
import { getError } from './selectors/user.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  hasError: boolean;

  constructor(public authService: AuthService, private store: Store<AppState>, private userActions: UserActions) { }

  ngOnInit() {
    this.authService.initAuthListener();

    this.store.select(getError).subscribe( err => err.hasError ? this.hasError = true : false);
  }

  closeModal() {
    this.hasError = false;
    // this.store.dispatch(this.userActions.unSetError());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
