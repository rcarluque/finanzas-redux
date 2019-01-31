import { Component, OnInit } from '@angular/core';
import { IngresoGastoService } from '../../services/ingreso-gasto.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(public ingresoEgresoService: IngresoGastoService) { }

  ngOnInit() {
    this.ingresoEgresoService.initIngresoEgresoListener();
  }

}
