import pino from 'pino'
import { logflarePinoVercel } from 'pino-logflare'

// create pino-logflare console stream for serverless functions and send function for browser logs
// Browser logs are going to: https://logflare.app/sources/13989
// Vercel log drain was setup to send logs here: https://logflare.app/sources/13830

const apiKey = import.meta.env.LOGFLARE_API_KEY
const sourceToken = import.meta.env.LOGFLARE_SOURCE_TOKEN

const { stream, send } = logflarePinoVercel({
    apiKey: apiKey,
    sourceToken: sourceToken,
});

const environment = import.meta.env.VERCEL_ENV
const commitSHA = import.meta.env.VERCEL_GIT_COMMIT_SHA
const isProduction = environment === 'production'

const loggerOptions = {
    browser: {
        transmit: {
            level: "info",
            send: send,
        }
    },
    level: isProduction ? 'info' : 'debug',
    base: {
        env: environment,
        revision: commitSHA,
    },
}

// create pino logger
const logger = pino(loggerOptions, stream);

export default logger