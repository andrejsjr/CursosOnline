import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'

@Component({
    selector: 'ap-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
    /*
        Usado para comunicação com o componente pai (passar valores<T>)
        O componente pai recebe o valor emitido através de $event.
    */
    @Output() onTyping = new EventEmitter<string>();

    @Input() value = '';
    
    debounce = new Subject<string>();
    
    /* #CicloDeVidaDoComponente
        ngOnInit é executado logo após o componente
        ser instanciado e receber as inbounds properties.
    */
    ngOnInit(): void {
        this.debounce
            /*
                debounce.pipe() aplica a operação passada no parâmetro.
                Como o operação passada foi debounceTime(300),
                o valor emitido só será capturado no subscribe
                quando não houver uma nova emissão em 300 ms.

                Assim, evitamos que a busca pelas fotos no backend
                e a aplicação do filtro ocorrerão a cada tecla digitada
                na busca. Somente quando o usuário parar de digitar
                por 300 ms ocorrerá a busca do backend e a aplicação
                do filtro.
            */
            .pipe(debounceTime(300))
            /*
                Diferente do subscribe() do Observable normal,
                o subscribe() do Subject não termina após a primeira
                emissão. Ele fica ativo o tempo todo escutando
                novas emissões, já que uma nova emissão pode ocorrer
                a qualquer hora através do .next().
            */
            .subscribe(filter => this.onTyping.emit(filter));
    }    
    
    /* #CicloDeVidaDoComponente
        ngOnDestroy é executado logo após o componente
        ser destruido. No caso, toda vez que a navegação
        sair de PhotoListComponent e acessar outro componente.
    */
    ngOnDestroy(): void {
        /*
        Como o subscribe() de debounce ficará ativo
        o tempo todo escutando novas emissões,
        é necessário dar o unsubscribe() quando
        PhotoListComponent for destruído,
        para desalocar o recurso da memória.
        */
        this.debounce.unsubscribe();
    }
}