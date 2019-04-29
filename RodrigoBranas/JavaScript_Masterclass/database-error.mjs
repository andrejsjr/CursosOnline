export default class DatabaseError {

    constructor(statement, message) {
        this.statement = statement;
        this.message = message;
    }

    showMessage() {
        return `${this.message}: ${this.statement}`;
    }
}