import { Component, OnInit, OnDestroy } from '@angular/core';
// ngrx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/mainState.model';
import { UiActions } from 'src/app/actions/ui.actions';

import { IngresoEgreso } from '../../../models/ingreso-egreso.model';
import { IngresoGastoService } from '../../../services/ingreso-gasto.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>, private ingresoGastoService: IngresoGastoService, private uiActions: UiActions) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso').subscribe( ingresoEgreso => this.items = ingresoEgreso.items);
  }

  borrarItem(uid: string) {
    this.ingresoGastoService.eliminarIngresoEgreso(uid)
      .then( () => this.store.dispatch(this.uiActions.showAlert('Eliminado con exito.')) );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
