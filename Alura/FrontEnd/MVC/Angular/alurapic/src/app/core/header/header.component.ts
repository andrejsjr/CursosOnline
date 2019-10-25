import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { UserService } from '../user/user.service';
import { User } from '../user/user';

@Component({
    selector: 'ap-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    /*
        É uma boa prática colocar um $
        na variável que vai receber um Observable
        para sinalizar com clareza
    */
    user$: Observable<User>

    constructor(
        // Injetados pelo Angular
        private userService: UserService,
        private router: Router
    ) {
        this.user$ = userService.getUser();
    }

    logout() {
        this.userService.logout();
        this.router.navigate(['']);
    }
}