const { DataTypes} = require('sequelize');

//defino el modelo Genres:

module.exports = (sequelize) => {
    sequelize.define('Genre', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },

    },{timestamps: false})
}