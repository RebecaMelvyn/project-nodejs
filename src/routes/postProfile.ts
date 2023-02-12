import { Application } from "express-ws";
import bodyParser from "body-parser";
import { findUserByEmail, findUserById, updateUser } from "../repositories/userRepository";
import { prisma } from "../repositories/prisma";


export function postProfile(app: Application) {
  app.post('/profile', bodyParser.urlencoded(),
    async (req, res) => {
      const email = req.body.email;
      const name = req.body.name;
      const findEmail = await findUserByEmail(email)
      if (findEmail) {
        res.status(400).send('Email déjà utiliser');
        return
      }
      const user = await updateUser(req.signedCookies.ssid, email, name);
      res.send('Changement effectuer !');
    })
}
