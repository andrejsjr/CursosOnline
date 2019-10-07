var redis = require("redis");
var client = redis.createClient();

client.on("error", error => {
    console.log(error);
});