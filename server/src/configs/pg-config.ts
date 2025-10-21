// Imports
import { registerAs } from "@nestjs/config";

// Configs
export default registerAs('pgConfig', () => ({
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  pass: process.env.POSTGRES_PASSWORD,
}));