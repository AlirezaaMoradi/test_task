// Imports
import { registerAs } from "@nestjs/config";

// Configs
export default registerAs('appConfig', () => ({
  port: process.env.PORT ? +process.env.PORT : 8000,
  api_version: process.env.API_VERSION,
})); 