import { registerAs } from '@nestjs/config';

export default registerAs('system', () => ({
  NODE_ENV: process.env.NODE_ENV,
  debug: process.env.DEBUG || false,
  SERVER_PORT: process.env.SERVER_PORT,
  API_VERSION: process.env.API_VERSION,
  API_DOC_ENDPOINT: process.env.API_DOC_ENDPOINT,
  JWT_SECRET: process.env.JWT_SECRET,
  requestTimeout: process.env.REQUEST_TIMEOUT || 60000,
  requestRetryMaxAttempts: process.env.REQUEST_RETRY_MAX_ATTEMPTS || 3,
  requestRetryScallingDurationInMs:
    process.env.REQUEST_RETRY_SCALLING_DURATION_IN_MS || 1000,
    CACHE_MANAGER_TTL: process.env.CACHE_MANAGER_TTL,
}));
