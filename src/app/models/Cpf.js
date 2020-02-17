import Sequelize, { Model } from 'sequelize';

class Cpf extends Model {
  static init(sequelize) {
    super.init(
      {
        cpf: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Cpf;
