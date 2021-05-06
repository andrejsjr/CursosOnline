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
  filter = '';

  // Para saber se tem mais photos para exibir.
  hasMore = true;

  currentPage = 1;
  userName = '';

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
    this.userName = this.activetedRoute.snapshot.params.userName;
    
    /* 
      Quando a rota ativada (activetedRoute) possui um
      Resolver associado, snapshot.data possui o objeto
      retornado pelo Resolver, no caso photos, que é
      um Observable<Photo[]>.
    */ 
    this.photos = this.activetedRoute.snapshot.data.photos;
  }

  load() {
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.filter = '';
        
        // Não muda a referência de this.photos
        // não sensilizando assim o change detection
        // do Angular.
        // this.photos.push(...photos);
        this.photos = this.photos.concat(photos);
        this.hasMore = !!photos.length;
      });
  }
}
