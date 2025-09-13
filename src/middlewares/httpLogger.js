import logger from "../utils/logger.js";

const httpLogger = (req, res, next) => {
  if (req.path === '/healthz') return next(); // skip logging

  const { method, url } = req;
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${method} ${url} ${res.statusCode} - ${duration}ms`);
  });

  next();
};

export default httpLogger;
