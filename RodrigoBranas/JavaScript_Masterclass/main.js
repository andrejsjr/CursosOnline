const DatabaseError = function(statement, message) {
    this.statement = statement;
    this.message = message;
};

const database = {
    tables: {
        
    },
    
    createTable(statement) {
        const regexp = /create table (?<tabela>[a-z]+) \((?<colunas>.+)\)/;
        const parsedStatement = statement.match(regexp);
        let [,tableName, columns] = parsedStatement;
        
        this.tables[tableName] = {
            columns: {},
            data: []
        };
        
        columns = columns.split(', ');
        
        for (let column of columns) {
            column = column.split(' ');
            let [name, type] = column;
            this.tables[tableName].columns[name] = type;           
        }
    },

    insert(statement) {
        const regexp = /insert into ([a-z]+) \((.+)\) values \((.+)\)/;
        const parsedStatement = statement.match(regexp);
        let [,tableName, columns, values] = parsedStatement;

        columns = columns.split(', ');
        values = values.split(', ');

        let row = {};
        for (let i = 0; i < columns.length; i++) {
            row[columns[i]] = values[i];
        }

        this.tables[tableName].data.push(row);
    },

    select(statement) {
        const regexp = /select (.+) from ([a-z]+) where (.+) = (.+)/;
        const parsedStatement = statement.match(regexp);
        let [,columns, tableName, columnWhere, valueWhere] = parsedStatement;        

        const rows = this.tables[tableName].data.filter(row => row[columnWhere] === valueWhere);       
        
        return rows.map(row => {
            return { name: row.name, age: row.age };
        });
    },

    execute(statement) {
        if (statement.startsWith('create table')) {
            return this.createTable(statement);
        } 
        
        if (statement.startsWith('insert')) {
            return this.insert(statement);
        } 
        
        if (statement.startsWith('select')) {
            return this.select(statement);
        } 
        
        throw new DatabaseError(statement, 'Syntax error');
    }
};

try {
    database.execute('create table author (id number, name string, age number, city string, state string, country string)');
    database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
    database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
    database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
    console.log(JSON.stringify(database.execute('select name, age from author where id = 1')));
    console.log(JSON.stringify(database.execute('select name, age from author where id = 2')));
    console.log(JSON.stringify(database.execute('select name, age from author where id = 3')));
    //console.log(JSON.stringify(database, undefined, '  '));    
} catch (error) {
    console.log(`${error.message}: ${error.statement}`);
}