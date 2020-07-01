import {createConnection, Connection} from "typeorm";
import ormconfig from "../../ormconfig";

class ConnectionDB {
  connection: Connection;

  async create() {
    this.connection = await createConnection({
        ...ormconfig
    });

    return this;
  }
}

export default new ConnectionDB();
