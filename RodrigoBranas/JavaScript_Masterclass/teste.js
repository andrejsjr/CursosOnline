const Parser = function() {

}

Parser.commands = new Map([
    ['createTable', /create table ([a-z]+) \((.+)\)/],
    ['insert', /insert into ([a-z]+) \((.+)\) values \((.+)\)/],
    ['select', /select (.+) from ([a-z]+)(?: where (.+))?/],
    ['delete', /delete from ([a-z]+)(?: where (.+))?/]
]);

Parser.parse = function(statement) {
    for (let [command, regexp] of Parser.commands) {
        const parsedStatement = statement.match(regexp);            
        
        if (parsedStatement) {
            return {
                command,
                parsedStatement
            };
        }
    }
};

console.log(Parser.parse('create table author (id number, name string, age number, city string, state string, country string)'));