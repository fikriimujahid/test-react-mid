import { getAllMatches } from "./ApiService";

/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 * 
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW AND
 *       PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.  
 */
class LeagueService {    

    /**
     * Sets the match schedule.
     * Match schedule will be given in the following form:
     * [
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      },
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      }    
     * ]
     * 
     * @param {Array} matches List of matches.
     */    
    setMatches(matches) {
        // matches.matches.map(function (match) {
        //     console.log(match)
        // })
        this.matches = matches.matches;
    }

    /**
     * Returns the full list of matches.
     * 
     * @returns {Array} List of matches.
     */
    getMatches() {
        return this.matches;
    }

    /**
     * Returns the leaderboard in a form of a list of JSON objecs.
     * 
     * [     
     *      {
     *          teamName: [STRING]',
     *          matchesPlayed: [INTEGER],
     *          goalsFor: [INTEGER],
     *          goalsAgainst: [INTEGER],
     *          points: [INTEGER]     
     *      },      
     * ]       
     * 
     * @returns {Array} List of teams representing the leaderboard.
     */
    getLeaderboard() {
        const leaderBoard = [];
        this.matches.map((match) => {

            const currentHomeTeam = leaderBoard.find(val => val.teamName === match.homeTeam);
            if(!currentHomeTeam){
                const teams = {
                    teamName: match.homeTeam,
                    matchesPlayed: ((match.matchPlayed) ? 1 : 0),
                    goalsFor: match.homeTeamScore,
                    goalsAgainst: match.awayTeamScore,
                    points: (match.homeTeamScore > match.awayTeamScore) ? 3 : (match.homeTeamScore === match.awayTeamScore && (match.matchPlayed)) ? 1 : 0
                }
                leaderBoard.push(teams);
            } else {
                currentHomeTeam.matchesPlayed += ((match.matchPlayed) ? 1 : 0);
                currentHomeTeam.goalsFor += match.homeTeamScore;
                currentHomeTeam.goalsAgainst += match.awayTeamScore;
                currentHomeTeam.points += (match.homeTeamScore > match.awayTeamScore) ? 3 : (match.homeTeamScore === match.awayTeamScore && (match.matchPlayed)) ? 1 : 0;
            }

            const currentAwayTeam = leaderBoard.find(val => val.teamName === match.awayTeam);
            if(!currentAwayTeam){
                const teams = {
                    teamName: match.awayTeam,
                    matchesPlayed: (match.matchPlayed) ? 1 : 0,
                    goalsFor: match.awayTeamScore,
                    goalsAgainst: match.homeTeamScore,
                    points: (match.awayTeamScore > match.homeTeamScore) ? 3 : (match.homeTeamScore === match.awayTeamScore && (match.matchPlayed)) ? 1 : 0
                }
                leaderBoard.push(teams);
            } else {
                currentAwayTeam.matchesPlayed += (match.matchPlayed) ? 1 : 0;
                currentAwayTeam.goalsFor += match.awayTeamScore;
                currentAwayTeam.goalsAgainst += match.homeTeamScore;
                currentAwayTeam.points += (match.awayTeamScore > match.homeTeamScore) ? 3 : (match.homeTeamScore === match.awayTeamScore && (match.matchPlayed)) ? 1 : 0;
            }
        });



        return leaderBoard.sort(function (a,b) {
            // if(a.points > b.points) return -1; 
            // if(a.points < b.points) return 1; 

            // if((a.goalsFor - a.goalsAgainst) > (b.goalsFor - b.goalsAgainst)) return 1
            // if((a.goalsFor - a.goalsAgainst) < (b.goalsFor - b.goalsAgainst)) return -1

            // if(a.goalsFor > b.goalsFor) return -1; 
            // if(a.goalsFor < b.goalsFor) return 1; 

            // if(a.teamName > b.teamName) return -1; 
            // if(a.teamName < b.teamName) return 1; 
            return (b.points - a.points) || ((b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst)) || (b.goalsFor - a.goalsFor) || (b.teamName - a.teamName);
        });
        // return leaderBoard.sort((a,b) => b.points - a.points);
    }
    
    /**
     * Asynchronic function to fetch the data from the server.
     */
    async fetchData() {
        await getAllMatches().then((response) => {
            // this.matches = response.data;
            this.setMatches(response.data)
        });
        // return await getAllMatches();
    }    
}

export default LeagueService;