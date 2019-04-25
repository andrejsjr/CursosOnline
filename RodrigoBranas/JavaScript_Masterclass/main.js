const DatabaseError = function(statement, message) {
    this.statement = statement;
    this.message = message;
};

const Parser = function() {
    const commands = new Map();
    commands.set('createTable', /create table (?<tabela>[a-z]+) \((?<colunas>.+)\)/);
    commands.set('insert', /insert into ([a-z]+) \((.+)\) values \((.+)\)/);
    commands.set('select', /select (.+) from ([a-z]+)(?: where (.+))?/);
    commands.set('delete', /delete from ([a-z]+)(?: where (.+))?/);

    this.parse = function(statement) {
        for (let [command, regexp] of commands) {
            const parsedStatement = statement.match(regexp);            
            
            if (parsedStatement) {
                return {
                    command,
                    parsedStatement
                };
            }
        }
    };
};

const database = {
    tables: {
        
    },

    parser: new Parser(),
    
    createTable(parsedStatement) {
        let [, tableName, columns] = parsedStatement;
        
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

    insert(parsedStatement) {
        let [, tableName, columns, values] = parsedStatement;

        columns = columns.split(', ');
        values = values.split(', ');

        let row = {};
        for (let i = 0; i < columns.length; i++) {
            row[columns[i]] = values[i];
        }

        this.tables[tableName].data.push(row);
    },

    select(parsedStatement) {
        let [, columns, tableName, whereClause] = parsedStatement;        
        columns = columns.split(', ');
        
        let rows = this.tables[tableName].data;
        
        if (whereClause) {
            whereClause = whereClause.split(' = ');
            const [columnWhere, valueWhere] = whereClause;
            rows = this.tables[tableName].data.filter(row => row[columnWhere] === valueWhere);
        }
        
        return rows.map(row => {
            let selectedRow = {};
            columns.forEach(column => selectedRow[column] = row[column]);
            return selectedRow;
        });
    },

    delete(parsedStatement) {
        let [, tableName, whereClause] = parsedStatement;

        if (whereClause) {
            whereClause = whereClause.split(' = ');
            const [columnWhere, valueWhere] = whereClause;
            this.tables[tableName].data = 
                this.tables[tableName].data.filter(row => row[columnWhere] !== valueWhere);
        } else {
            this.tables[tableName].data =[];
        }
    },

    execute(statement) {
        const cmdObj = this.parser.parse(statement)        
        
        if (cmdObj) {
            return this[cmdObj.command](cmdObj.parsedStatement);
        } else {
            throw new DatabaseError(statement, 'Syntax error');
        }
    }
};

try {
    database.execute('create table author (id number, name string, age number, city string, state string, country string)');
    database.execute('insert into author (id, name, age) values (1, Douglas Crockford, 62)');
    database.execute('insert into author (id, name, age) values (2, Linus Torvalds, 47)');
    database.execute('insert into author (id, name, age) values (3, Martin Fowler, 54)');
    database.execute('delete from author where id = 2');    
    // database.execute("delete from author");
    // database.execute('select id, name, age from author');
    // console.log(JSON.stringify(database.execute('select name, age from author where id = 1')));
    console.log(JSON.stringify(database.execute('select id, name, age from author'), undefined, ' '));
    // console.log(JSON.stringify(database.execute('select name, age from author where id = 3')));
    // console.log(JSON.stringify(database, undefined, '  '));  
} catch (error) {
    console.log(`${error.message}: ${error.statement}`);
}