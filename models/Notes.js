module.exports = (sequelize, DataTypes) => {
  const Notes = sequelize.define("Notes", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Notes.associate = (models) => {
    Notes.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Notes;
};
