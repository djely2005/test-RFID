import { Pool } from 'postgres';
import dotenv from 'dotenv';
dotenv.config();
export const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432, // Default PostgreSQL port
});