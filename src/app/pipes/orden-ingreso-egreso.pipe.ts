import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngresoEgreso'
})
export class OrdenIngresoEgresoPipe implements PipeTransform {

  // Con función sort de javascript indicamos si tiene que cambiarlo
  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return items.sort( (a, b) => {
      if (a.tipo === true) {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
