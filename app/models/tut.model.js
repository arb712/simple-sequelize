module.exports = (sequelize, Sequelize) => {
  const tut = sequelize.define("tut", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });
  return tut;
};
