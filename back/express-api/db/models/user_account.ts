import { Model, Table, Column, DataType, PrimaryKey } from "sequelize-typescript";
import { Express } from "express"
// import dbConfig from "../base_settings/db"

@Table({
    tableName: 'user_account'
})
export default class UserAccount extends Model implements Express.User{
    
    @Column({
        type : DataType.STRING,
        primaryKey : true,
    })
    loginid: string;

    @Column({
        type: DataType.STRING
        ,allowNull : false
        ,field : "name"
    })
    name: string;

    @Column({
        type:DataType.STRING
        ,allowNull :false
        ,field : "password"
    })
    password: string;

    @Column({
        type:DataType.BOOLEAN
        ,allowNull :false
        ,field: "enable"
        ,defaultValue:true
    })
    enable: boolean;
}