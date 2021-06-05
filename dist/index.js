"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
// main routes
const getList_1 = __importDefault(require("./routes/pao/getList"));
const putList_1 = __importDefault(require("./routes/pao/putList"));
const deleteItem_1 = __importDefault(require("./routes/pao/deleteItem"));
const deleteUserAccount_1 = __importDefault(require("./routes/pao/deleteUserAccount"));
const putItem_1 = __importDefault(require("./routes/pao/putItem"));
const updateItem_1 = __importDefault(require("./routes/pao/updateItem"));
// auth routes
const refreshToken_1 = __importDefault(require("./routes/auth/refreshToken"));
const signin_1 = __importDefault(require("./routes/auth/signin"));
const signup_1 = __importDefault(require("./routes/auth/signup"));
const signout_1 = __importDefault(require("./routes/auth/signout"));
const port = process.env.PORT;
mongoose_1.default.set("useCreateIndex", true);
const server = express_1.default();
server.use(cors_1.default());
server.use(express_1.default.json());
server.use("/lists", updateItem_1.default, getList_1.default, putList_1.default, putItem_1.default, deleteItem_1.default);
server.use("/", deleteUserAccount_1.default);
server.use("/auth", refreshToken_1.default);
server.use("/auth", signin_1.default);
server.use("/auth", signup_1.default);
server.use("/auth", signout_1.default);
mongoose_1.default.connect(process.env.MONGO_MAIN, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("connected to db"));
mongoose_1.default.connection
    .once("open", () => console.log("connection to mongoDb successful"))
    .on("error", (err) => {
    console.log(err, "failed to connect to mongoDb");
});
server.listen(2999, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map