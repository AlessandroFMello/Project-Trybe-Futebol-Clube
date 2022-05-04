import MatchGoalsShape from '../interfaces/matchGoalsShape';

export default class TeamMatchesResults {
  public name: string;

  public totalPoints: number;

  public totalGames: number;

  public totalVictories: number;

  public totalDraws: number;

  public totalLosses: number;

  public goalsFavor: number;

  public goalsOwn: number;

  public goalsBalance: number;

  public efficiency: number;

  constructor(teamName: string, matches: MatchGoalsShape[]) {
    this.name = teamName;
    this.totalPoints = TeamMatchesResults.getPoints(matches);
    this.totalGames = matches.length;
    this.totalVictories = TeamMatchesResults.getVictories(matches);
    this.totalDraws = TeamMatchesResults.getDraws(matches);
    this.totalLosses = TeamMatchesResults.getLosses(matches);
    this.goalsFavor = TeamMatchesResults.getGoalsFavor(matches);
    this.goalsOwn = TeamMatchesResults.getGoalsOwn(matches);
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.efficiency = TeamMatchesResults.getEfficiency(this.totalGames, this.totalPoints);
  }

  private static getPoints = (matches: MatchGoalsShape[]): number => {
    let totalPoints = 0;
    matches.forEach((match) => {
      if (match.goalsFavor > match.goalsOwn) totalPoints += 3;
      if (match.goalsFavor === match.goalsOwn) totalPoints += 1;
    });
    return totalPoints;
  };

  private static getVictories(matches: MatchGoalsShape[]): number {
    let totalVictories = 0;
    matches.forEach((match) => {
      if (match.goalsFavor > match.goalsOwn) totalVictories += 1;
    });
    return totalVictories;
  }

  private static getDraws(matches: MatchGoalsShape[]): number {
    let totalDraws = 0;
    matches.forEach((match) => {
      if (match.goalsFavor === match.goalsOwn) totalDraws += 1;
    });
    return totalDraws;
  }

  private static getLosses(matches: MatchGoalsShape[]): number {
    let totalLosses = 0;
    matches.forEach((match) => {
      if (match.goalsFavor < match.goalsOwn) totalLosses += 1;
    });
    return totalLosses;
  }

  private static getGoalsFavor(matches: MatchGoalsShape[]): number {
    let totalGoalsFavor = 0;
    matches.forEach((match) => { totalGoalsFavor += match.goalsFavor; });
    return totalGoalsFavor;
  }

  private static getGoalsOwn(matches: MatchGoalsShape[]): number {
    let totalGoalsOwn = 0;
    matches.forEach((match) => { totalGoalsOwn += match.goalsOwn; });
    return totalGoalsOwn;
  }

  private static getEfficiency(games: number, points: number) {
    const efficiency = (points * 100) / (games * 3);
    return Number(efficiency.toFixed(2));
  }
}
