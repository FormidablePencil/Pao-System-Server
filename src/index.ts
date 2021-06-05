import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

// main routes
import getList from "./routes/pao/getList";
import putList from "./routes/pao/putList";
import deleteItem from "./routes/pao/deleteItem";
import deleteUserAccount from "./routes/pao/deleteUserAccount";
import putItem from "./routes/pao/putItem";
import updateItem from "./routes/pao/updateItem";

// auth routes
import refreshToken from "./routes/auth/refreshToken";
import signIn from "./routes/auth/signin";
import signUp from "./routes/auth/signup";
import signOut from "./routes/auth/signout";

const port = process.env.PORT;

mongoose.set("useCreateIndex", true);

const server = express();

server.use(cors());
server.use(express.json());

server.use("/lists", updateItem, getList, putList, putItem, deleteItem);
server.use("/", deleteUserAccount);

server.use("/auth", refreshToken);
server.use("/auth", signIn);
server.use("/auth", signUp);
server.use("/auth", signOut);

mongoose.connect(
  process.env.MONGO_MAIN,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db")
);
mongoose.connection
  .once("open", () => console.log("connection to mongoDb successful"))
  .on("error", (err) => {
    console.log(err, "failed to connect to mongoDb");
  });

server.listen(2999, () => {
  console.log(`server started at http://localhost:${port}`);
});
