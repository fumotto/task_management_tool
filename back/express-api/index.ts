import { randomUUID } from 'crypto'
import express from 'express'
import session from 'express-session'

import {createClient} from "redis"
import RedisStore from 'connect-redis';
import loginRouter from './login/router' 
import todoRouter from './todolist/router'
import db from "./db/db"
import passport from 'passport'

const app: express.Express = express()

new db().createTables()

// CORSの許可
// app.use((req , res, next) => {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next()
// })

// sessionの使用
let redisClient = createClient({ url: 'redis://redis:6379' })
redisClient.connect().catch(console.error)
let redisStore  =  new RedisStore({
  client:redisClient,
  prefix:"tasks_manager:"
})
const sess = {
  secret: "hoge", // FIXME!
  resave: false,
  saveUninitialized: true,
  cookie: {secure:false ,httpOnly:false },//if https then true
  genid: function() {
    return genuuid() // use UUIDs for session IDs
  },
  store:redisStore
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.httpOnly = true // XSS攻撃を防ぐ
  sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess))

app.use(passport.initialize());
app.use(passport.session());

// body-parserに基づいた着信リクエストの解析
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// GetとPostのルーティング
const router: express.Router = express.Router()
router.get('/api/getTest', (req:express.Request, res:express.Response) => {
  res.send(req.query)
})
app.use(router)
app.use(loginRouter)
app.use(todoRouter)


if (app.get('env') !== 'production') {
  // for debug!
  router.get('/api/urlmap', function (req, res) {
    res.json({
        router: router.stack.filter(r => r.route)
          .map(r=> { return {"path":r.route.path,"methods":r.route.methods}}),
        loginRouter: loginRouter.stack.filter(r => r.route)
          .map(r=> { return {"path":r.route.path,"methods":r.route.methods}}),
        todoRouter : todoRouter.stack.filter(r => r.route)
          .map(r=> { return {"path":r.route.path,"methods":r.route.methods}}),
      });
  });
}

// 9000番ポートでAPIサーバ起動
app.listen(9000,()=>{ console.log('"backend-api" is listening on port 9000!') })


function genuuid() {
  return randomUUID()
}