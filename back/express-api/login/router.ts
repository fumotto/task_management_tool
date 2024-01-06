// モジュールのインポート
import express from "express";
import passport from "passport";
import {LoginLogic} from './logic'

// アプリケーションの作成
const router: express.Router = express.Router();
const logic = new LoginLogic()

//ログインチェックの実装
logic.setLoginStrategy();

/** ユーザー登録のルート */ 
router.post("/api/signup",logic.signup);

/** ユーザー認証のルート */
router.post("/api/login", passport.authenticate('local'), logic.login);

/** ログイン済みか */
router.get("/api/isLogined", logic.isLogined);

/** ログアウト */
router.get("/api/logout", logic.logout);

export default router;
