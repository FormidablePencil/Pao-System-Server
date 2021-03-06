import express from "express";
const signUp = express.Router();
import authenticateToken from "../../middleware/authenticationToken";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models/userModel";
import { PaoModel } from "../../models/paoModel";
import RefreshTokenModal from "../../models/tokenModal";
import generateAccessToken from "../../middleware/generateAccessToken";
import { v4 as uuidv4 } from "uuid";

//@
signUp.post("/signup", async (req, res, next) => {
  const { password, username, email } = req.body;
  if (!password && !username && !email)
    return res.json("username, password or email is missing");
  const checkIfUserExistsByUsername = await UserModel.findOne({ username });
  const checkIfUserExistsByEmail = await UserModel.findOne({ email });
  if (checkIfUserExistsByUsername || checkIfUserExistsByEmail)
    return res.status(409).send({ message: "user already exists" });
  const hashedPassword = await bcrypt.hash(password, 10);
  const userModel = new UserModel({
    username,
    password: hashedPassword,
    email,
  });
  const paoList = new PaoModel({
    username,
    // list: [
    //   {
    //     _id: uuidv4(),
    //     number: null,
    //     person: null,
    //     action: null,
    //     object: null,
    //   }
    // ]
  });
  console.log(paoList);
  try {
    await paoList.save();
    await userModel.save();
    const accessToken = generateAccessToken(username);
    const refreshToken = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET);
    const token = new RefreshTokenModal({ token: refreshToken });
    await token.save();
    res.json({ accessToken, refreshToken }); //! sending to client token
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

export default signUp;

