import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  
  photos: Photo[] = [];
  filter: string = '';
  
  constructor(private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    // this.activatedRoute.snapshot.data
    // dá acesso ao objeto que está em resolve
    // na configuração da rota
    this.photos = this.activatedRoute.snapshot.data['photos'];
  }
}
