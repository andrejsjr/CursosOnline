import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ap-load-button',
  templateUrl: './load-button.component.html',
  styleUrls: ['./load-button.component.css']
})
export class LoadButtonComponent implements OnInit {

  // Para saber se tem mais photos para exibir.
  @Input() hasMore = false;

  constructor() { }

  ngOnInit() {
  }

}
