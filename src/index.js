import * as dotenv from "dotenv";
import express from "express";
import connectToMongoDB from "./config/database.js";
import cors from "cors";
import createSocketServer from "./config/socket.js";
import clientRouter from "./routes/clientRouter.js";
import bodyParser from 'body-parser';

import path,  { dirname } from 'path';
import { fileURLToPath } from 'url';
import linkRouter from "./routes/linkRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

// connect to database first
connectToMongoDB();

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
    origin: [
        'exp://192.168.100.8:8081',
        '*'
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // required to pass
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));


app.use("/api/v1/client", clientRouter);
app.use("/api/v1/link", linkRouter);


app.use('/images', express.static(path.join(__dirname, 'images')));

export const io = createSocketServer(app, port);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("Hello World!");
})
