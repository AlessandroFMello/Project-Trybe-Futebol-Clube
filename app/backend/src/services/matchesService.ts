import MatchShape from '../interfaces/matchShape';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

export default class MatchesService {
  notFound:string;

  constructor() {
    this.notFound = 'Match not found';
  }

  public getAll = async () => {
    const findAllMatches = await Match.findAll({
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });

    if (!findAllMatches) return { code: 401, message: this.notFound };

    return { code: 200, allMatches: findAllMatches };
  };

  public getById = async (id: string) => {
    const findMatchById = await Match.findByPk(id);

    if (!findMatchById) return { code: 401, message: this.notFound };

    return { code: 200, match: findMatchById };
  };

  public create = async ({
    homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
  }: MatchShape) => {
    const findHomeTeam = await Match.findByPk(homeTeam);
    const findAwayTeam = await Match.findByPk(awayTeam);

    if (!findHomeTeam || !findAwayTeam) {
      return { code: 404, message: 'There is no team with such id!' };
    }

    const createMatch = await Match.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
    });

    if (!createMatch) return { code: 401, message: 'Error! Match not created' };

    return { code: 201, match: createMatch };
  };

  public finish = async (id: number) => {
    const findExistingMatch = await Match.findByPk(id);

    if (!findExistingMatch) return { code: 401, message: this.notFound };

    const updateMatch = await Match.update(
      {
        inProgress: false,
      },
      { where: { id } },
    );

    if (!updateMatch) return { code: 401, message: 'Error! Match not updated' };

    return { code: 200, match: updateMatch };
  };

  public update = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
    const findExistingMatch = await Match.findByPk(id);

    if (!findExistingMatch) return { code: 401, message: 'Match not found' };

    const updateMatch = await Match.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      { where: { id } },
    );

    if (!updateMatch) return { code: 401, message: 'Error! Match not updated' };

    return {
      code: 200,
      match: {
        homeTeamGoals,
        awayTeamGoals,
      },
    };
  };
}
