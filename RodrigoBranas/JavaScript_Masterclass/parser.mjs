class Parser {

    static commands = new Map([
        ['createTable', /create table ([a-z]+) \((.+)\)/],
        ['insert', /insert into ([a-z]+) \((.+)\) values \((.+)\)/],
        ['select', /select (.+) from ([a-z]+)(?: where (.+))?/],
        ['delete', /delete from ([a-z]+)(?: where (.+))?/]
    ]);    
    
    static parse(statement) {
        for (let [command, regexp] of commands) {
            const parsedStatement = statement.match(regexp);            
            
            if (parsedStatement) {
                return {
                    command,
                    parsedStatement
                };
            }
        }
    }
}