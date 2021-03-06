import winston from 'winston';
import expressWinston from 'express-winston';

export const loggerMiddleware = expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.cli(),
  meta: false,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: true,
  ignoreRoute: function (req, res) { return false; }
});

const myFormatter = winston.format((info) => {
    const {durationMs, message} = info;
    info.message = `${message} ${durationMs ?  `[duration: ${durationMs} ms]` : ""}`;
    return info;
})();

export const log = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        myFormatter,
        winston.format.cli()
    ),
    colorize: true,
});

// expose log globaly to avoid imports on all modules
global.log = log;