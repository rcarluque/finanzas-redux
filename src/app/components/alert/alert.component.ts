import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() msg: string;
  @Output() cerrar:  EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() { }

  cerrarModal() {
    this.cerrar.emit(false);
  }

}
