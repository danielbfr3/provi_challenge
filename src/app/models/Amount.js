import Sequelize, { Model } from 'sequelize';

class Amount extends Model {
  static init(sequelize) {
    super.init(
      {
        amount_in_cents: Sequelize.INTEGER,
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

export default Amount;
