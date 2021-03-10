import { registerAs } from "@nestjs/config"

export default registerAs('services', () => ({
    requestTimeout: process.env.REQUEST_TIMEOUT || 60000
}))