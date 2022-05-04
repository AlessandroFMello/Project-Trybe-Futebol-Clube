import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  private leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  public getHome = async (_req: Request, res: Response) => {
    const { code, leaderboard } = await this.leaderboardService.getHome();

    return res.status(code).json(leaderboard);
  };

  public getAway = async (_req: Request, res: Response) => {
    const { code, leaderboard } = await this.leaderboardService.getAway();

    return res.status(code).json(leaderboard);
  };
}
