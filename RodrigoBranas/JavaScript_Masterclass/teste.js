function sum(a, b, callback) {
    setTimeout(() => {
        callback(a + b);
    }, 5000);    
}

sum(2, 2, result => console.log(result));