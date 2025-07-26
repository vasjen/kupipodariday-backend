import { join } from 'path';

export default () => ({
  server_port: parseInt(process.env.SERVER_PORT, 10),
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [join(__dirname, '/../**/*.entity.{js,ts}')],
    synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    exp: process.env.JWT_TOKEN_TIME_LIMIT,
  }
});

