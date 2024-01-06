// モジュールのインポート
import express from "express";
import UserRepository from "../db/repositories/userRepository";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import UserAccount from "../db/models/user_account";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Log from "../descripter/logger";


export class LoginLogic {
    /** ユーザー登録のルート */
    @Log()
    public async signup(req: Request, res: Response) {
        const request = structuredClone(req.query);
        try {
            // リクエストからユーザー名とパスワードを取得
            const { username, password } = req.body;

            // ユーザー名が空でないかチェック
            if (!username) {
                return res.status(400).json({ message: "ユーザー名を入力してください" });
            }

            // パスワードが空でないかチェック
            if (!password) {
                return res.status(400).json({ message: "パスワードを入力してください" });
            }

            // ユーザー名が既に存在するかチェック
            const result = await UserRepository.findOne(username);
            if (result) {
                return res.status(409).json({ message: "ユーザー名が既に存在します" });
            }

            // ユーザーをデータベースに登録
            const user = await UserRepository.insert(
                new UserAccount({
                    name: username,
                    password: password,
                })
            );

            // 登録成功のレスポンス
            return res.status(201).json({ message: "ユーザー登録が完了しました" });
        } catch (err) {
            // エラーのレスポンス
            console.error(err);
            res.status(500).json({ message: "サーバーエラーが発生しました" });
        }
    }

    // ユーザー認証のルート
    @Log()
    public async login(req: Request, res: Response) {
        try {
            return res.status(200).json({ message: "ログイン成功" });
        } catch (err) {
            // エラーのレスポンス
            console.error(err);
            res.status(500).json({ message: "サーバーエラーが発生しました" });
        }
    }

    // 認証済みユーザーのみアクセス可能なルート
    @Log()
    public async isLogined(req: Request, res: Response, next: Function) {
        try {
            if (req.user) {
                console.log("200");
                return res.status(200).json({ message: "ログイン済みです" });
            } else {
                console.log("401");
                return res.status(401).json({ message: "未ログインです" });
            }
        } catch (err) {
            // エラーのレスポンス
            console.error(err);
            return res.status(500).json({ message: "サーバーエラーが発生しました" });
        }
    }

    @Log()
    public async logout(req: Request, res: Response, next: Function) {
        req.logout((err) => {
            if (!err) {
                return res.status(200).json({ message: "ログアウト成功" });
            } else {
                console.error(err);
                return res.status(500).json({ message: "サーバーエラーが発生しました" });
            }
        });
    }

    /**ログインチェックの実装 */
    @Log()
    public setLoginStrategy() {
        const strategy = new LocalStrategy(async (username, password, done) => {
            // ここでユーザー認証を行う

            // ユーザー名が空でないかチェック
            if (!username) {
                return done(null, false, { message: "ユーザー名を入力してください" });
            }

            // パスワードが空でないかチェック
            if (!password) {
                return done(null, false, { message: "パスワードを入力してください" });
            }

            // ユーザー名が存在するかチェック
            const user = await UserRepository.findOne(username);
            if (!user) {
                return done(null, false, { message: "ユーザー名またはパスワードが間違っています" });
            } else {
                // パスワードが正しいかチェック
                const validPassword: boolean = await bcrypt.compare(password, user.password);
                if (!validPassword) {
                    return done(null, false, { message: "パスワードが間違っています" });
                }

                return done(null, user);
            }
        });
        passport.use(strategy);

        passport.serializeUser(function (user, done) {
            done(null, user);
        });

        passport.deserializeUser(async function (user :UserAccount, done) {
            // const user_account = await userRepository.findOne(user.loginid)
            // done(null, user_account);
            done(null ,user)
        });
    }
}
