class BaseControlador {

    static rotas() {
        return { lista: '/' };
    }

    home() {
        return function(req, resp) {
            resp.marko(
                require('../views/base/home/home.marko')
            );
        };
    }
}

module.exports = BaseControlador;