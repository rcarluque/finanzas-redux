import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { IngresoGastoService } from '../../services/ingreso-gasto.service';
import { AppState } from '../../models/mainState.model';
import { UiActions } from '../../actions/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  form: FormGroup;
  // Ingreso: true - Egreso: false
  tipo =  true;
  cargando: boolean;

  constructor(private igservice: IngresoGastoService,
    private store: Store<AppState>,
    private uiActions: UiActions) { }

    ngOnInit() {
      this.subscription = this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading);

      this.form = new FormGroup({
        'descripcion': new FormControl('', Validators.required),
        'cantidad': new FormControl('', [Validators.required, Validators.min(1)] )
      });
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

    crearIE() {
      const ingresoGasto: IngresoEgreso = {
        ...this.form.value,
        tipo: this.tipo
    };

    this.store.dispatch(this.uiActions.activarLoading());
    this.igservice.crearIngresoEgreso(ingresoGasto)
      .then( () => {
        this.form.reset();
        this.store.dispatch(this.uiActions.desctivarLoading());
      })
      .catch( err => {
        this.store.dispatch(this.uiActions.desctivarLoading());
        this.store.dispatch(this.uiActions.showAlert(err.message));
      });
  }

}
