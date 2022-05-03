import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class User extends Model {
  id: number;

  username: string;

  password: string;

  email: string;

  role: string;
}
User.init({
  id: {
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  sequelize: db,
  modelName: 'User',
  tableName: 'users',
  underscored: true,
  timestamps: false,
});
