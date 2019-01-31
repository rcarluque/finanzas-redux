import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/mainState.model';
import { getError } from '../../selectors/user.selector';
import { getMessage } from '../../selectors/ui.selector';
import { Subscription } from 'rxjs';
import { UiActions } from '../../actions/ui.actions';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription>;
  // public error$: Observable<any>;
  public mensaje: string;
  isUialert: boolean;

  @Output() cerrar:  EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private store: Store<AppState>, private uiActions: UiActions) {
    this.subscriptions = [];
    // this.error$ = this.store.select(getError);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(getError).subscribe( error => {
        if (error.showAlert) {
          this.mensaje = error.texto;
        }
      }),
      this.store.select(getMessage).subscribe( msg => {
        if (msg.showAlert) {
          this.isUialert = true;
          this.mensaje = msg.texto;
        }
      })
    );
  }

  cerrarModal() {
    this.cerrar.emit(false);
    if (this.isUialert) {
      this.store.dispatch(this.uiActions.quitMensaje());
      this.isUialert = false;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }

}
