export class HttpService {
    _handleErrors(res) {
        if (!res.ok) throw new Error(res.statusText);
        return res;
    }
    
    get(url) {
        // Usando XMLHttpRequest
        
        // return new Promise((resolve, reject) => {
        //     let xhr = new XMLHttpRequest();
        //     xhr.open('GET', url);

        //     xhr.onreadystatechange = () => {
        //         /* 
        //             0: requisição não foi iniciada
        //             1: conexão com o servidor estabelecida
        //             2: requisição recebida
        //             3: processando requisição
        //             4: requisição concluída e a resposta está pronta
        //         */

        //         if(xhr.readyState == 4) {
        //             if(xhr.status == 200)
        //                 resolve(JSON.parse(xhr.responseText));
        //             else {
        //                 console.log(xhr.responseText);
        //                 reject(xhr.responseText);
        //             }
        //         }
        //     };

        //     xhr.send();
        // });

        // Usando FetchAPI

        return  fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());
    }

    // Usando XMLHttpRequest
    
    /* post(url, dado) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(xhr.responseText);
                    }
                }
            };
            
            xhr.send(JSON.stringify(dado));
        });
    }
     */

    // Usando FecthAPI

    post(url, dado) {
        return fetch(url, {
            headers: {'Content-type' : 'application/json'},
            method: 'post',
            body: JSON.stringify(dado)
        })
        .then(res => this._handleErrors(res));
    }
}