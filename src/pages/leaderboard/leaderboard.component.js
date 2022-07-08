import React, {useEffect, useState, useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import LeagueService from '../../services/LeagueService';
import { LeaderboardContainer, LeaderboardFlagImage, LeaderboardTable, TitleContainer } from './leaderboard.style';

const Leaderboard = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  }

  const [leaderboardData, setLeaderboardData] = useState([]);
  const fetchLeaderboardData = useCallback(async () => {
    try{
      const leaderboardData = new LeagueService();
      await leaderboardData.fetchData();
      console.log(leaderboardData.getLeaderboard());
      setLeaderboardData(leaderboardData.getLeaderboard())
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    fetchLeaderboardData();
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, [fetchLeaderboardData]);

  return (
    <LeaderboardContainer>
      <TitleContainer>League Standings</TitleContainer>
      <LeaderboardTable>
        <Table>
          <thead style={{backgroundColor:'#E4EDF2', border:'#E4EDF2', borderBottom: 'hidden', fontSize: '12px'}}>
            <tr style={{height: '40px'}}>
              <th style={{textAlign: 'left'}} colSpan="2">Team Name</th>
              <th style={{ width: '70px', textAlign: 'center'}}>MP</th>
              {width > 500 && <th style={{ width: '70px', textAlign: 'center'}}>GF</th>}
              {width > 500 && <th style={{ width: '70px', textAlign: 'center'}}>GA</th>}
              {width < 501 && <th style={{ width: '70px', textAlign: 'center'}}>GD</th>}
              <th style={{ width: '70px', textAlign: 'center'}}>Points</th>
            </tr>
          </thead>
          <tbody>
          {leaderboardData.map((leaderBoard, index) => {
            return (
              <tr key={index}>
                <td style={{textAlign: 'right', width: '70px'}}><LeaderboardFlagImage src={'https://countryflagsapi.com/svg/'+leaderBoard.teamName.toLowerCase()} alt='item' /></td>
                <td style={{textAlign: 'left', fontWeight: 'bold', fontSize: '16', verticalAlign: 'middle'}}>{leaderBoard.teamName}</td>
                <td style={{textAlign: 'center', fontSize: '12', verticalAlign: 'middle' }}>{leaderBoard.matchesPlayed}</td>
                {width > 500 && <td style={{textAlign: 'center', fontSize: '12', verticalAlign: 'middle' }}>{leaderBoard.goalsFor}</td>}
                {width > 500 && <td style={{textAlign: 'center', fontSize: '12', verticalAlign: 'middle' }}>{leaderBoard.goalsAgainst}</td>}
                {width < 501 && <td style={{textAlign: 'center', fontSize: '12', verticalAlign: 'middle' }}>{leaderBoard.goalsFor - leaderBoard.goalsAgainst}</td>}
                <td style={{textAlign: 'center', fontWeight: 'bold', fontSize: '16', verticalAlign: 'middle', color: 'blue'}}>{leaderBoard.points}</td>
              </tr>
            )
          })}
          </tbody>
        </Table>
      </LeaderboardTable>
      
    </LeaderboardContainer>
  )
}

export default Leaderboard;