import Sequelize, { Model } from 'sequelize';

class Birthday extends Model {
  static init(sequelize) {
    super.init(
      {
        birthday: Sequelize.STRING,
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

export default Birthday;
