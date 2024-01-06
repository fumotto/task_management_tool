import login_required from "../login/loginchecker";
import Task from "../db/models/tasks";
import todoRepository from "../db/repositories/todoRepository";
import express from "express";
import { Request, Response }from "express";
import { GeoReplyWith } from "redis";
import { deserializeUser, serializeUser } from "passport";
import UserAccount from "../db/models/user_account";
import TodoLogic from "./logic"

const router = express.Router()
const logic = new TodoLogic()

router.get('/api/tasks/Todo/', [login_required ,logic.getTodoes])

router.put('/api/tasks/Todo/new/', [login_required ,logic.putTodo])

router.put('/api/tasks/Todo/update/bulk/', [login_required ,logic.saveBulk])

export default router