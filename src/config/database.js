module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'provi',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
