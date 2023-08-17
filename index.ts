import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { apiRouter } from "./api";

const app = express();
app.use(express.static("web/root"));
app.use(express.json());

app.use("/api", apiRouter);

app.listen(4242, () => console.log("Running on port 4242"));
