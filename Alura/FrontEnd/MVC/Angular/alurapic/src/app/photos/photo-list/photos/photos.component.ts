import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Photo } from '../../photo/photo';

@Component({
  selector: 'ap-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnChanges {

  @Input() photos: Photo[] = [];
  rows = [];

  constructor() { }
  
  /*
    Executado sempre que alguma property
    ligada a data biding é atualizada.
  */
  ngOnChanges(changes: SimpleChanges): void {
    /*
      changes terá sempre as propertys que
      foram atualizadas (adicionado dinamicamente).
    */
    if (changes.photos)
      this.rows = this.groupColumns(this.photos);
  }

  groupColumns(photos: Photo[]) {
    const newRows = [];

    for (let index = 0; index < photos.length; index+=3) {
      newRows.push(photos.slice(index, index + 3));
    }

    return newRows;
  }
}
