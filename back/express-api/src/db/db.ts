import {Sequelize} from 'sequelize-typescript';
import UserAccount from "./models/user_account";
import Task from './models/tasks';
import Log from '../descripter/logger';
require('dotenv').config();
/**
 * 接続設定
 */
const config = {
    HOST: process.env.DB_HOST || "postgres",
    USER: "postgres",
    PASSWORD: "postgres",
    DB: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
const dialect = "postgres";

const models = [UserAccount ,Task]

class Database {
    public sequelize: any | undefined;
  
    constructor() {
      this.connectToDatabase();
    }
  
    private async connectToDatabase() {
      this.sequelize = new Sequelize({
        database: config.DB,
        username: config.USER,
        password: config.PASSWORD,
        host: config.HOST,
        dialect: dialect,
        pool: {
          max: config.pool.max,
          min: config.pool.min,
          acquire: config.pool.acquire,
          idle: config.pool.idle
        },
        models: models
      });
  
      await this.sequelize
        .authenticate()
        .then(() => {
          console.log("Connection has been established successfully.");
        })
        .catch((err: any) => {
          console.error("Unable to connect to the Database:", err);
        });
    }

    @Log()
    public async createTables(){
      // await this.connectToDatabase()
      // console.log('createTables!')
      this.sequelize.addModels(models);
      this.sequelize.sync();
    }
  }
  
  export default Database;