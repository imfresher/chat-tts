import dotenv from 'dotenv';
import { version } from '../../package.json'

dotenv.config();

export const APP_VERSION = version || '1.0.0';
export const APP_NODE_ENV = process.env['APP_NODE_ENV'] || 'development';
export const APP_LANG = process.env['APP_LANG'] || 'en-US';
export const APP_TIME_ZONE = process.env['TIME_ZONE'];

export const TCP_SERVER_HOST = process.env['TCP_SERVER_HOST'] || '0.0.0.0';
export const TCP_SERVER_PORT = process.env['TCP_SERVER_PORT'] || 1342;
export const SERVER_HOST = process.env['HOST'] || 'http://localhost';
export const SERVER_PORT = process.env['PORT'] || 4000;

export const IS_DEVELOPMENT = APP_NODE_ENV === 'development';
export const IS_PRODUCTION = APP_NODE_ENV === 'production';
export const IS_TESTING = APP_NODE_ENV === 'testing';
