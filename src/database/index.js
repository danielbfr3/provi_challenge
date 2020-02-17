import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Address from '../app/models/Address';
import Name from '../app/models/Name';
import Birthday from '../app/models/Birthday';
import Phone from '../app/models/Phone';
import Cpf from '../app/models/Cpf';

const models = [User, Address, Birthday, Name, Phone, Cpf];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
