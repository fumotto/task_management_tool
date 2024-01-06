import sequelize from "sequelize/types/sequelize";
import Task from "../models/tasks";
import UserAccount from "../models/user_account";
import { Op } from "sequelize";

interface TodoRepository{
    
    addTask(...args :any):Promise<Task>;

    getTasks(userAccount : UserAccount):Promise<Array<Task>>;

    saveBulk( tasks :Array<Task>):Promise<Task[]>

    changeUser( task :Task , userAccount : UserAccount):Promise<Boolean>

    findOneTask(title :string):Promise<Task | null>;


}

class TodoRepositoryImpl implements TodoRepository{
    addTask(arg: any): Promise<Task> {
        return Task.create(arg);
    }
    findOneTask(title :string):Promise<Task | null>{
        return Task.findOne({where : {title:title}})
    }

    getTasks(userAccount: UserAccount): Promise<Task[]> {
        return Task.findAll({where : {loginid : userAccount.loginid , status : {[Op.ne] : '終了'} } , order : ["priority"]});
    }
    saveBulk(tasks: Task[]): Promise<Task[]> {
        tasks.map((task) =>
            Task.update(
                {title : task.title   , status : task.status , loginid : task.loginid , priority : task.priority}
                ,{ where :{ id : task.id } }
            )
        )

        return Promise.resolve(tasks)
    }
    changeUser(task: Task, userAccount: UserAccount): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
    
}

export default new TodoRepositoryImpl();