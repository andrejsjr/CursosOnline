import { Pipe, PipeTransform } from '@angular/core';
import { Photo } from '../photo/photo';

@Pipe({ name: 'filterByDescription'})
export class FilterByDescription implements PipeTransform {
    
    transform(
        /* O que vai ser tranformado */photos: Photo[],
        /* Os parâmetros */descriptionQuery: string
    ) {        
        descriptionQuery = descriptionQuery.trim().toLowerCase();

        if (descriptionQuery) {
            return photos.filter(photo =>
                photo.description.toLowerCase().includes(descriptionQuery)
            );
        } else {
            return photos;
        }
    }
}

// Um PIPE precisa estar dentro de um módulo