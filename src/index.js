const express = require("express");
const cors = require('cors');
const expressWinston = require("express-winston");
const winston = require("winston");
const {optionsLogger} = require("./libs/logger");
const {generateAuth} = require("./controllers/auth.controller");
const userRouter = require("./router/user.route");
const companyRoute = require("./router/company.route");

const app = express();
const prefix = "/apis/";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: '*'
}));

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console(optionsLogger.console),
        new winston.transports.File(optionsLogger.file),
        new winston.transports.Http({
            level: 'warn',
            format: winston.format.combine(
                winston.format.json(),
                winston.format.timestamp(),
            ),
        }),
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
}))
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console(optionsLogger.console),
        new winston.transports.File(optionsLogger.fileError)
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
}))


// put controller
app.post(`${prefix}login`, generateAuth);
app.use(`${prefix}users`, userRouter);
app.use(`${prefix}companies`, companyRoute);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


module.exports = app;
