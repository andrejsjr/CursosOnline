import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];

  /*
    Padronizamos deixar os constructors apenas
    para injeções de dependência, deixando as
    construções em sí para o ngOnInit.
  */
  constructor(
    private activetedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) { }
  
  /* #CicloDeVidaDoComponente
    ngOnInit é executado logo após o componente
    ser instanciado e receber as inbounds properties.
  */
  ngOnInit(): void {
    const userName = this.activetedRoute.snapshot.params.userName;
    
    this.photoService
      .listFromUser(userName)
      .subscribe(photos => this.photos = photos);
  }
}
