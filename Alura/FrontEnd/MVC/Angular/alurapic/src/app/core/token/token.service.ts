import { Injectable } from '@angular/core';

const KEY = 'authToken';

@Injectable({
    // Única instância para aplicação inteira
    providedIn: 'root'
})
export class TokenService {

    hasToken() {
        return !!this.getToken();
    }

    setToken(token: string) {
        window.localStorage.setItem(KEY, token);
    }

    getToken() {
        return window.localStorage.getItem(KEY);
    }

    removeToken() {
        window.localStorage.removeItem(KEY);
    }
}