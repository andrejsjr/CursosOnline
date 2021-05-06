/*
    Utilizamos um Resolver quando precisamos que um determinado
    recurso esteja disponível para o componente já no momento
    da ativação da rota, antes do componente ser instanciado.

    No contexto de utilização do alurapic, precisamos que
    o array de photos obtido através do backend esteja
    disponível para o template de PhotoListComponent antes
    que o mesmo seja instanciado. Caso contrário, a property
    photos será inicializada com um array vazio, provocando
    a visualização do "Sorry, no photos", antes da obtenção
    da lista de photos.
*/

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

/*
    Como o Resolve usará o método listFromUserPaginated de PhotoService,
    ele precisa conter a tipagem do retorno do método.
*/

@Injectable({ providedIn: 'root' })
export class PhotoListResolver implements Resolve<Observable<Photo[]>> {

    constructor(private photoService: PhotoService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Photo[]> {
        const userName = route.params.userName;
        return this.photoService.listFromUserPaginated(userName, 1);
    }
}