export function throttle(milissegundos = 500) {
    return function (target, propertyKey, descriptor) {
        const metodoOriginal = descriptor.value;
        let time = 0;
        descriptor.value = function (...args) {
            if (event)
                event.preventDefault();
            clearInterval(time);
            time = setTimeout(() => metodoOriginal.apply(this, args), milissegundos);
        };
        return descriptor;
    };
}
