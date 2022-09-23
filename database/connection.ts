import { Sequelize } from "sequelize";

const db = new Sequelize("testnode", "root", "", {
  host: "localhost",
  dialect: "mysql",
  //   login: false
  // dialect: 'mssql'
});

export default db;
