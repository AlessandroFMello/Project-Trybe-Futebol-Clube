import Team from '../database/models/Team';

export default class LoginService {
  public getAll = async () => {
    const findAllTeams = await Team.findAll();

    if (!findAllTeams) return { code: 401, message: 'Incorrect email or password' };

    return { code: 200, allTeams: findAllTeams };
  };

  public getById = async (id: string) => {
    const findTeamById = await Team.findByPk(id);

    if (!findTeamById) return { code: 401, message: 'Team not found' };

    return { code: 200, team: findTeamById };
  };
}
