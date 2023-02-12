import { Application } from "express-ws";
import path from "path";


export function getChat(app: Application) {
    app.get('/chat', (req, res) => {
        res.render(path.join(__dirname, '../../pages/chat.ejs'))
    })
}
