import { Component } from '@angular/core';
import { Observable } from 'rxjs';

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

    user: User;

    constructor(userService: UserService) {
        this.user$ = userService.getUser();
        this.user$.subscribe(user => this.user = user);
    }
}