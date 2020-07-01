import {createConnection, Connection} from "typeorm";

class ConnectionDB {
  connection: Connection;

  async create() {
    const ormconfig = process.env.IS_TS_NODE
      ? require("../../ormconfig.dev")
      : require("../../ormconfig");

    this.connection = await createConnection({
        ...ormconfig
    });

    return this;
  }
}

export default new ConnectionDB();
