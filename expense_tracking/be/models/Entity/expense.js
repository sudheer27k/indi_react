module.exports = (sequelize, DataTypes) => {
    const  Expense= sequelize.define("expenses", {
      date: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.INTEGER,
      },
      category: {
        type: DataTypes.STRING,
      },

    });
    return Expense;
  };