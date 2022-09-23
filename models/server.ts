import express, { Application } from "express";
import router from "../routes/user-route";
import cors from "cors";

import db from "../database/connection";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    user: "/api/users",
  };
  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8080";

    // Metodo iniciales
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("database online");
    } catch (error) {
      throw new Error('error');
    }
  }

  middlewares() {
    // Cors
    this.app.use(cors());
    // Lectura del body
    this.app.use(express.json());
    // Carpeta publica
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.user, router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto: ", this.port);
    });
  }
}

export default Server;
