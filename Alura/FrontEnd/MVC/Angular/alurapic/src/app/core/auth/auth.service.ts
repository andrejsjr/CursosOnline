import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:3000';

@Injectable({
  // Única instância para aplicação inteira
  providedIn: 'root'
})
export class AuthService {

  // HttpClient é injetado automaticamente pelo Angular
  constructor(private http: HttpClient) { }

  authenticate(userName: string, password: string) {
    return this.http.post(`${API_URL}/user/login`, { userName, password });
  }
}
