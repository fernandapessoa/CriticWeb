import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";

const dataSource = new DataSource({
  type: process.env.TYPEORM_TYPE as "postgres",
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: true,
  logging: false,
  schema: process.env.TYPEORM_SCHEMA,
  entities: [__dirname + "/../entities/**/*.{ts,js}"],
  migrations: [__dirname + "/../migrations/**/*.{ts,js}"],
});

dataSource
  .initialize()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => console.log(error));

export { dataSource };
