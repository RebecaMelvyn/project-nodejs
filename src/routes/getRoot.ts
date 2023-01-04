import path from "path";
import {Application} from "express-ws";
import {findUserById} from "../repositories/userRepository";
import {authenticationMiddleware} from "../middlewares/authenticationMiddleware";

export function getRoot(app: Application) {
  app.get(
    '/',
    authenticationMiddleware,
    async (req, res) => {
    const user = await findUserById(req.signedCookies.ssid)
    if(!user) {
      res.clearCookie('ssid')
      res.redirect('/login')
      return
    }

    res.sendFile(path.join(__dirname, '../../pages/index.html'))
  })
}
