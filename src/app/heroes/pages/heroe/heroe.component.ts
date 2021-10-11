import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => console.log(id))
  }

}
