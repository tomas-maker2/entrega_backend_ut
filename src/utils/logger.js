import winston from "winston";
import 'dotenv/config'

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const developmentTransport = new winston.transports.Console({
    format: winston.format.combine(winston.format.timestamp(), logFormat),
    level: 'debug',
});

const productionTransport = new winston.transports.File({
    filename: 'errors.log',
    level: 'error',
});

const developmentLogger = winston.createLogger({
    transports: [developmentTransport],
});

const productionLogger = winston.createLogger({
    transports: [productionTransport],
});

   export const logger = process.env.NODE_ENV === 'production' ? productionLogger : developmentLogger;