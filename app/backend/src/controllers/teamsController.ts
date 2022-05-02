import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

export default class LoginController {
  private teamsService: TeamsService;

  constructor() {
    this.teamsService = new TeamsService();
  }

  public getAll = async (req: Request, res: Response) => {
    const { code, allTeams, message } = await this.teamsService.getAll();

    if (!allTeams) {
      return res.status(code).json({ message });
    }

    return res.status(code).json(allTeams);
  };

}
