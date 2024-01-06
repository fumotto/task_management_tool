import UserAccount from "../db/models/user_account";
import todoRepository from "../db/repositories/todoRepository";
import { Request, Response } from "express";
import Log from "../descripter/logger";
import Task from "../db/models/tasks";

export default class TodoLogic{

    @Log()
    public async getTodoes(req: Request, res: Response) {
        const tasks = await todoRepository.getTasks(req.user as UserAccount)
        return res.status(200).json({tasks})
    }

    @Log()
    public async putTodo (req: Request, res: Response){
        // TODO 型チェックとか
        console.log(req.body)
        
        if(!req.body){
            return res.status(400).json({message : "登録したい情報を入力してください"})
        }
        const title = req.body.title
        if(!title){
            return res.status(400).json({message : "タイトルを入力してください"})
        }
        const usr =  req.user as UserAccount || null 
        const loginid = usr.loginid
        console.log('loginid: '+ loginid)

        const dup :Task | null = await todoRepository.findOneTask(title)
        if(dup){
            return res.status(409).json({message : "同名のタスクが既に登録されています"})
        }

        const newTask = await todoRepository.addTask({title,loginid})

        return res.status(200).json({tasks:newTask , message: '作成が完了しました。'})
    }

    @Log()
    public async saveBulk(req: Request, res: Response){
        const tasks  = req.body as Array<Task>
        console.log(tasks)

        if(!tasks || tasks.length < 1){
            return res.status(400).json({message : "登録したい情報を入力してください"})
        }

        const tasksupdated = await todoRepository.saveBulk(tasks)

        return res.status(200).json({tasks:tasksupdated , message: '更新が完了しました。'})
    }
}

