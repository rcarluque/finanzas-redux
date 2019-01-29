import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/mainState.model';
import { getError } from '../../selectors/user.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  mensaje: string;

  @Output() cerrar:  EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(getError).subscribe( error => this.mensaje = error.texto);
  }

  cerrarModal() {
    this.cerrar.emit(false);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
