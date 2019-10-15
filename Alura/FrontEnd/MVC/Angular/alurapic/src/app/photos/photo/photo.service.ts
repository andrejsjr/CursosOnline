import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Photo } from './photo';

/* 
    No Angular, não podemos fazer requisição AJAX
    na mão, ou então usar JQuery
    Precisamos usar o classe HttpClient do Angular
    que encapsula essa funcionalidade
    de forma integrada ao framework

    Para que um HttpClient seja injetado automaticamente
    pelo Angular em http através do construtor
    é necessário que um provider esteja disponível

    Para que o provider esteja disponível
    é necessário que o módulo HttpClientModule
    esteja importado
*/

const API = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class PhotoService {
    constructor(private http: HttpClient) {}

    listFromUser(userName: string) {
        return this.http
            .get<Photo[]>(`${API}/${userName}/photos`);
    }

    listFromUserPaginated(userName: string, page: number) {
        const params = new HttpParams().append('page', page.toString());
        
        return this.http
            .get<Photo[]>(`${API}/${userName}/photos`, { params });
    }
}