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

}
