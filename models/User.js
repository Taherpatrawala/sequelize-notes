module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  //User.associate = (models) => {
  //  User.hasMany(sequelize.define("Notes"), {
  //    foreignKey: {
  //      allowNull: false,
  //    },
  //    onDelete: "SET NULL",
  //    onUpdate: "CASCADE",
  //  });
  //};

  return User;
};
