import { Request, Response } from "express";

function login_required(req: Request, res: Response, next:Function) {
    if (req.user) {
        // loginした状態なら、通す
        return next()
    } else {
        // loginしてないなら終わり
        return res.status(401).json({ message: "ログインが必要です" });
    }
}

export default login_required;
