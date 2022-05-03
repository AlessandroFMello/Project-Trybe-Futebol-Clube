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
}
