"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize("testnode", "root", "", {
    host: "localhost",
    dialect: "mysql",
    //   login: false
    // dialect: 'mssql'
});
exports.default = db;
//# sourceMappingURL=connection.js.map