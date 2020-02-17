import Sequelize, { Model } from 'sequelize';

class Name extends Model {
  static init(sequelize) {
    super.init(
      {
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        full_name: Sequelize.VIRTUAL,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async name => {
      if (name.full_name) {
        const [first, ...rest] = name.full_name.split(' ');
        name.first_name = first;
        name.last_name = rest.join(' ');
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Name;
