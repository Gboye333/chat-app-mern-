import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import connectToMongoDb from "./db/connectDb.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());

// app.get("/", (req,res) => {
//     res.send("Hello world")
// });

app.use("/api/auth",authRoutes)


app.listen(PORT,() => {
    connectToMongoDb();
console.log(`app is listening at port ${PORT}`)
});