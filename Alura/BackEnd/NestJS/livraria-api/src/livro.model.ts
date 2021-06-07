import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table
export class Livro extends Model<Livro> {
    // O id vem automaticamente quando extendemos Model
    // id: number;
    
    @Column({
        type: DataType.STRING(60),
        allowNull: false
    })
    codigo: string;
    
    @Column({
        type: DataType.STRING, // padrão 255
        allowNull: false
    })
    nome: string;
    
    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    preco: number;    
}