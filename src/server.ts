import expressWs, { Application } from "express-ws";
import express, {NextFunction, Request, Response} from "express";
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import {getLogin} from "./routes/getLogin";
import {postLogin} from "./routes/postLogin";
import {getRoot} from "./routes/getRoot";
import {getWs} from "./routes/getWs";
import {authenticationMiddleware} from "./middlewares/authenticationMiddleware";
import {getRegister} from "./routes/getRegister";
import {postRegister} from "./routes/PostRegister";

const SECRET_KEY = 'MySecretKeyIsAwesome';

function main() {
  const app = express() as unknown as Application;
  expressWs(app);
  const sockets = new Map();

  app.use((req, res, next) => {
    console.log(new Date().toISOString(), req.method, req.path);
    next()
  })
  app.use(cookieParser(SECRET_KEY))
  app.use(express.static(path.join(__dirname, '../public')))

  getLogin(app)
  postLogin(app)
  getRegister(app)
  postRegister(app)

  app.use(authenticationMiddleware)
  getRoot(app)
  getWs(app, sockets)

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    res.status(500).send('Internal Server Error')

    next()
  })

  app.listen(3000, () => {
    console.log('App listening on port 3000!');
  });
}

main()