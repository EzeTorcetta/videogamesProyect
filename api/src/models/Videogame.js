const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,       // este id se crea cada vez que agregamos un videogame a la tabla
      primaryKey:true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    platforms: {
      type: DataTypes.JSON,
      allowNull: false,
      get() {
        const value = this.getDataValue('platforms');
        if (!value) {
          return [];
        }
        return JSON.parse(value);
      },
      set(value) {
        if (Array.isArray(value)) {  // Comprueba si el valor es un arreglo
          this.setDataValue('platforms', value);
        } else {
          this.setDataValue('platforms', JSON.parse(value));
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    released:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {timestamps: false});
};
