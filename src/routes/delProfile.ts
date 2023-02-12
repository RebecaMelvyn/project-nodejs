import {Application} from "express-ws";
import bodyParser from "body-parser";
import {deleteUser} from "../repositories/userRepository";
import {prisma} from "../repositories/prisma";


export function delProfile(app: Application) {
  app.post('/delete-profile', bodyParser.urlencoded(),
    async (req, res) => {
      const user = await deleteUser(req.signedCookies.ssid);
      res.send('Compte supprimer !')

    })
}
