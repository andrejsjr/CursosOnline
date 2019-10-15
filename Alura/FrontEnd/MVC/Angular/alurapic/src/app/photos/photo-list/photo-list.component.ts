import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {  
  
  photos: Photo[] = [];
  filter: string = '';
  
  /* 
    Através de um Subject, podemos emitir um valor
    e quem "se inscreve" no Subject (subscribe)
    tem acesso ao valor emitido
  */
  debounce: Subject<string> = new Subject<string>();

  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) { }
  
  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params.userName;
    
    // this.activatedRoute.snapshot.data
    // dá acesso ao objeto que está em resolve
    // na configuração da rota
    this.photos = this.activatedRoute.snapshot.data['photos'];
    
    /* 
      "Inscrevemos no Subject" para ter acesso
      ao valor emitido (capturado através do keyup)
      a atribuí-lo à propriedade filter do componente

      Esse subscribe fica escutando cada emissão de valor
      sofrida pelo Subject

      .pipe() aplica operadores do rxjs
      No caso estamos aplicando o operador debounceTime
      que nos permite parametrizar um tempo de ociosidade
      para escuta do subscribe

      Então, quando o usuário parar de digitar por 300ms
      o subscribe dá acesso ao que foi digitado
    */
    this.debounce
      .pipe(debounceTime(300))
      .subscribe(filter => this.filter = filter);
  }

  // Chamado toda vez que componente é destruído
  ngOnDestroy(): void {
    /* 
      Como não podemos parar a emissão de valor ao Subject
      com this.debounce.complete()
      já que não sabemos quando o usuário vai parar de digitar
      precisamos cancelar a inscrição ao Subject (unsubscribe)
      quando o componente for destruído
      parando assim de ficar capturando
      a emissão de valor evitando assim os memory leaks
    */
   this.debounce.unsubscribe();
  }

  load() {
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.photos = this.photos.concat(photos);
        if (!photos.length) this.hasMore = false;
      });
  }
}
