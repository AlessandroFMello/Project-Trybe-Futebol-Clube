import Team from '../database/models/Team';

export default class LoginService {
  public getAll = async () => {
    const findAllTeams = await Team.findAll();

    if (!findAllTeams) return { code: 401, message: 'Incorrect email or password' };

    return { code: 200, allTeams: findAllTeams };
  };

}
