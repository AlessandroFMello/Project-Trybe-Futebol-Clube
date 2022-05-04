import Team from '../database/models/Team';
import Match from '../database/models/Match';
import TeamMatchesResults from './teamMatchesResults';

export default class LeaderboardService {
  private getAllTeams = async () => {
    const allTeams = await Team.findAll();
    return allTeams;
  };

  private getAllMatches = async () => {
    const allMatches = await Match.findAll();
    return allMatches;
  };

  public async getHome() {
    const teams = await this.getAllTeams();
    const matches = await this.getAllMatches();
    const results: TeamMatchesResults[] = [];
    teams.forEach((team) => {
      const filteredMatches = matches
        .filter(
          (filteredMatch) => filteredMatch.inProgress === false
        && filteredMatch.homeTeam === team.id,
        );
      const mappedMatches = filteredMatches
        .map((mappedMatch) => ({
          goalsFavor: mappedMatch.homeTeamGoals,
          goalsOwn: mappedMatch.awayTeamGoals,
        }));

      const teamResults = new TeamMatchesResults(team.teamName, mappedMatches);

      results.push(teamResults);
    });

    return { code: 200, leaderboard: this.compareTeams(results) };
  }

  public async getAway() {
    const teams = await this.getAllTeams();
    const matches = await this.getAllMatches();

    const results: TeamMatchesResults[] = [];
    teams.forEach((team) => {
      const filteredMatches = matches
        .filter(
          (filteredMatch) => filteredMatch.inProgress === false
      && filteredMatch.awayTeam === team.id,
        );
      const mappedMatches = filteredMatches
        .map((mappedMatch) => ({
          goalsFavor: mappedMatch.awayTeamGoals,
          goalsOwn: mappedMatch.homeTeamGoals,
        }));

      const teamResults = new TeamMatchesResults(team.teamName, mappedMatches);

      results.push(teamResults);
    });

    return { code: 200, leaderboard: this.compareTeams(results) };
  }

  private compareTeams = (teams: TeamMatchesResults[]) => teams.sort((a, b) => {
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    return 0;
  });
}
