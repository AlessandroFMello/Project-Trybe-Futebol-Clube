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
    const homeGames: TeamMatchesResults[] = [];

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

      homeGames.push(teamResults);
    });

    return { code: 200, leaderboard: this.compareTeams(homeGames) };
  }

  public getAway = async () => {
    const teams = await this.getAllTeams();
    const matches = await this.getAllMatches();

    const awayGames: TeamMatchesResults[] = [];
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

      awayGames.push(teamResults);
    });

    return { code: 200, leaderboard: this.compareTeams(awayGames) };
  };

  public async getAllTeamMatches() {
    const teams = await Team.findAll();
    const matches = await Match.findAll();

    const allGames: TeamMatchesResults[] = [];

    teams.forEach((team) => {
      const filteredHome = matches
        .filter((match) => match.homeTeam === team.id && match.inProgress === false);
      const mappedHome = filteredHome
        .map((match) => ({ goalsFavor: match.homeTeamGoals, goalsOwn: match.awayTeamGoals }));

      const filteredAway = matches
        .filter((match) => match.awayTeam === team.id && match.inProgress === false);
      const mappedAway = filteredAway
        .map((match) => ({ goalsFavor: match.awayTeamGoals, goalsOwn: match.homeTeamGoals }));

      const teamResults = new TeamMatchesResults(team.teamName, [...mappedHome, ...mappedAway]);

      allGames.push(teamResults);
    });
    return { code: 200, leaderboard: this.compareTeams(allGames) };
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
