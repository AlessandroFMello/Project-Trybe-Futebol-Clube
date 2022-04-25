import { DataTypes, Model } from 'sequelize/types';
import db from '.';

export default class User extends Model {
  id: number;

  username: string;

  password: string;

  email: string;

  role: string;
}
User.init({
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
  modelName: 'users',
});
