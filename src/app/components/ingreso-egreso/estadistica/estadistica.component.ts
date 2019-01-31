import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/mainState.model';
import { getItems } from '../../../selectors/ingreso-egreso.selector';
import { IngresoEgreso } from '../../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  ingresos: number;
  gastos: number;
  numIngresos: number;
  numGastos: number;
  cargando: boolean;

  private subscription: Subscription = new Subscription();
  public doughnutChartLabels: string[] = ['Ingresos', 'Gastos'];
  public doughnutChartData: number[] = [];
  public doughnutChartType = 'doughnut';

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.cargando = true;
    setTimeout( () => {
      this.subscription = this.store.select(getItems)
        .subscribe( items => this.contarIngresoEgreso(items) );
      this.cargando = false;
    }, 500);
  }

  contarIngresoEgreso(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.gastos = 0;
    this.numIngresos = 0;
    this.numGastos = 0;

    items.forEach( item => {
      if (item.tipo === true) {
        this.numIngresos++;
        this.ingresos += item.cantidad;
      } else {
        this.numGastos++;
        this.gastos += item.cantidad;
      }
    });

    this.doughnutChartData = [this.ingresos, this.gastos];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
