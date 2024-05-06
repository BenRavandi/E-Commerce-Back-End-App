const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProductTag extends Model { }

ProductTag.init(
    {
        // Defines id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // Defines product_id column
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "Product",
                key: "id"
            }
        },
        // Defines tag_id column
        tag_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "Tag",
                key: "id"
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'product_tag',
    }
);

module.exports = ProductTag;