import {Application} from "express-ws";
import bodyParser from "body-parser";
import {findUserByEmail, findUserById} from "../repositories/userRepository";


export function postLogout(app: Application) {
  app.get('/logout', bodyParser.urlencoded(),
    async (req, res) => {
        res.clearCookie('ssid');
        res.redirect('/login')
    })
}
