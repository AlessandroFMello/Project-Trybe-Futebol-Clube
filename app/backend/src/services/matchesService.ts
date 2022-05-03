import MatchShape from '../interfaces/matchShape';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

export default class MatchesService {
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

    if (!findAllMatches) return { code: 401, message: 'Matches not found' };

    return { code: 200, allMatches: findAllMatches };
  };

  public getById = async (id: string) => {
    const findMatchById = await Match.findByPk(id);

    if (!findMatchById) return { code: 401, message: 'Match not found' };

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

    if (!findExistingMatch) return { code: 401, message: 'Match not found' };

    const updateMatch = await Match.update(
      {
        inProgress: false,
      },
      { where: { id } },
    );
    // const getUpdatedMatch = await Match.findByPk(id);

    if (!updateMatch) return { code: 401, message: 'Error! Match not updated' };

    return { code: 200, match: updateMatch };
  };
}
