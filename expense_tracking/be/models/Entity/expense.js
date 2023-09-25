module.exports = (sequelize, DataTypes) => {
    const  Expense= sequelize.define("expenses", {
      date: {
        type: DataTypes.DATEONLY,
      },
      // description: {
      //   type: DataTypes.STRING,
      // },
      amount: {
        type: DataTypes.INTEGER,
      },
      category: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
        allowNull: false,
      },
      isDelete: {
        type: DataTypes.STRING,
        defaultValue: false,
      },

    });
    return Expense;
  };