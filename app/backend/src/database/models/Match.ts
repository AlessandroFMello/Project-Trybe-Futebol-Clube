import { DataTypes, Model } from 'sequelize';
import db from '.';
import Team from './Team';

export default class Match extends Model {
  id: number;

  homeTeam: number;

  homeTeamGoals: number;

  awayTeam: number;

  awayTeamGoals: number;

  inProgress: boolean;
}
Match.init({
  id: {
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  homeTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  awayTeam: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  tableName: 'matches',
  timestamps: false,
});

Team.hasMany(
  Match,
  { foreignKey: 'homeTeam', as: 'homeMatches' },
);
Team.hasMany(
  Match,
  { foreignKey: 'awayTeam', as: 'awayMatches' },
);

Match.belongsTo(
  Team,
  { foreignKey: 'homeTeam', as: 'teamHome' },
);
Match.belongsTo(
  Team,
  { foreignKey: 'awayTeam', as: 'teamAway' },
);
