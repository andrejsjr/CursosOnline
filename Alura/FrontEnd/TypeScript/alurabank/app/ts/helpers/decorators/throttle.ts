export function throttle(milissegundos = 500) {

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const metodoOriginal = descriptor.value;
        let time = 0;

        descriptor.value = function(...args: any[]) {
            if (event) event.preventDefault();
            clearInterval(time);            
            time = setTimeout(() => metodoOriginal.apply(this, args), milissegundos);
        }

        return descriptor;
    }
}