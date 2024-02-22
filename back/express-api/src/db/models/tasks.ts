import { Model, Table, Column, DataType, PrimaryKey, ForeignKey, BelongsTo } from "sequelize-typescript";
import UserAccount from "./user_account";
// import {User} from "express"
// import dbConfig from "../base_settings/db"

@Table({
    tableName: 'tasks'
})
export default class Task extends Model {
    
    @Column({
        type: DataType.STRING
        ,allowNull : false
        ,field : "title"
        ,unique : true
    })
    title: string;

    // 担当者
    @Column({
        type : DataType.STRING
    })
    @ForeignKey(() => UserAccount)
    loginid: string;

    @BelongsTo(() => UserAccount)
    user!: UserAccount;

    @Column({
        type:DataType.ENUM('未着手' , '進行中' ,'停止中', 'レビュー中', '終了')
        ,allowNull :false
        ,field: "status"
        ,defaultValue:'未着手'
    })
    status: string;

    @Column({
        type:DataType.INTEGER
        , allowNull :false
        , field : "priority"
        , defaultValue : 1
    })
    priority : Number
}