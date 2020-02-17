import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Address from '../app/models/Address';
import Name from '../app/models/Name';
import Birthday from '../app/models/Birthday';
import Phone from '../app/models/Phone';
import Cpf from '../app/models/Cpf';
import Amount from '../app/models/Amount';

const models = [User, Address, Birthday, Name, Phone, Cpf, Amount];

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

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/gobarber',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
