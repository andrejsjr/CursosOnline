import Parser from './parser';
import DatabaseError from './database-error'

export class Database {
    
    constructor() {
        this.tables = {};
        this.parser =  new Parser();
    }
    
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
    }

    insert(parsedStatement) {
        let [, tableName, columns, values] = parsedStatement;

        columns = columns.split(', ');
        values = values.split(', ');

        let row = {};
        for (let i = 0; i < columns.length; i++) {
            row[columns[i]] = values[i];
        }

        this.tables[tableName].data.push(row);
    }

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
    }

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
    }

    execute(statement) {

        return new Promise((resolve, reject) => {
            
            setTimeout(() => {
                const cmdObj = this.parser.parse(statement)        
                
                if (cmdObj) {
                    resolve(this[cmdObj.command](cmdObj.parsedStatement));
                } else {
                    reject(new DatabaseError(statement, 'Syntax error'));
                }
            
            }, 3000);
        });
    }
}