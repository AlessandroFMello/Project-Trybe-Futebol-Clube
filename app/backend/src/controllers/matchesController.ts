import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  private matchesService: MatchesService;

  constructor() {
    this.matchesService = new MatchesService();
  }

  public getAll = async (req: Request, res: Response) => {
    const { code, allMatches, message } = await this.matchesService.getAll();

    if (!allMatches) {
      return res.status(code).json({ message });
    }

    return res.status(code).json(allMatches);
  };

  public getById = async (req: Request, res: Response) => {
    const { code, match, message } = await this.matchesService.getById(req.params.id);

    if (!match) {
      return res.status(code).json({ message });
    }

    return res.status(code).json(match);
  };

  public create = async (req: Request, res: Response) => {
    const {
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
    } = req.body;

    if (homeTeam === awayTeam) {
      return res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const { code, match, message } = await this.matchesService.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
    });

    if (!match) {
      return res.status(code).json({ message });
    }

    return res.status(code).json(match);
  };

  public finish = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { code, match, message } = await this.matchesService.finish(Number(id));

    if (!match) {
      return res.status(code).json({ message });
    }

    return res.status(code).json(match);
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const { code, match, message } = await this.matchesService
      .update(Number(id), homeTeamGoals, awayTeamGoals);

    if (!match) {
      return res.status(code).json({ message });
    }

    return res.status(code).json(match);
  };
}
