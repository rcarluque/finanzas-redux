import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './services/auth.service';
import { AppState } from './models/mainState.model';
import { getError } from './selectors/user.selector';
import { getMessage } from './selectors/ui.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription>;
  showAlert: boolean;

  constructor(public authService: AuthService, private store: Store<AppState>) {
    this.subscriptions = [];
  }

  ngOnInit() {
    this.authService.initAuthListener();

    this.subscriptions.push(
      this.store.select(getError).subscribe( err => err.showAlert ? this.showAlert = true : false),
      this.store.select(getMessage).subscribe( err => err.showAlert ? this.showAlert = true : false)
    );
  }

  closeModal() {
    this.showAlert = false;
    // this.store.dispatch(this.userActions.unSetError());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }

}
