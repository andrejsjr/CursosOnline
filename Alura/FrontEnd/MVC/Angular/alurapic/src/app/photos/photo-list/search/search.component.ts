import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'ap-search',
    templateUrl: './search.component.html'    
})
export class SearchComponent implements OnInit, OnDestroy {
    
    /* 
        Definição do evento customizado onTyping
        Além de difinir o evento, estamos dizendo
        que ele ao ser disparado emite uma <string>
     */
    @Output() onTyping = new EventEmitter<string>();
    //     
    
    @Input() value: string = '';
    
    /* 
        Através de um Subject, podemos emitir um valor
        e quem "se inscreve" no Subject (subscribe)
        tem acesso ao valor emitido
    */
    debounce: Subject<string> = new Subject<string>();
   
    ngOnInit(): void {
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
            // Emitindo o evento onTyping
            // com o valor de filter (valor digitado)
            .subscribe(filter => this.onTyping.emit(filter));
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
}