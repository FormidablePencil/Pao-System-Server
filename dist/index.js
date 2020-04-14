"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import mongoose from 'mongoose'
// import cors from 'cors'
const port = 8000;
const router = express_1.default.Router();
const app = express_1.default();
// app.use(cors())
app.use(express_1.default.json());
// app.use('/', index)
// router.get('/', (req, res, next) => {
//   res.render('index', {title: 'Express'})
// })
app.get("/", (req, res) => {
    res.send("Hello ld!");
});
// mongoose.connect(process.env.SOME_USER, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('connected to db'))
// mongoose.connection
//   .once('open', () => console.log('connection to mongoDb successful'))
//   .on('error', (err) => {
//     console.log('err in connecting to mongoDb')
//   })
app.listen(() => {
    console.log(`server started at http://localhost:80802`);
});
// module.exports = app
// console.log with a logging framework such as winston
//# sourceMappingURL=index.js.map