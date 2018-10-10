export class HttpService {

    // Usando Fetch API
    _handleErrors(res) {
        if (!res.ok)
            throw new Error(res.statusText);

        return res;
    }

    get(url) {
        // Usando Fetch API
        return fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());
    }

    post(url, dado) {
        // Usando Fetch API
        return fetch(url, {
            headers: {'Content-Type' : 'application/json'},
            method: 'post',
            body: JSON.stringify(dado)
        })
        .then(res => this._handleErrors(res));
    }
}