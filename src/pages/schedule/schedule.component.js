import React, {useEffect, useState, useCallback} from "react";
import { ScheduleContainer, ScheduleFlagImage, ScheduleTable, TitleContainer } from "./schedule.style";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import LeagueService from "../../services/LeagueService";
import moment from 'moment';

const Schedule = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  }

  const [schedulesData, setSchedulesData] = useState([]);
  const fetchScheduleData = useCallback(async () => {
    try{
      const leaderboardData = new LeagueService();
      await leaderboardData.fetchData();
      setSchedulesData(leaderboardData.getMatches())
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    fetchScheduleData();
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, [fetchScheduleData]);

  return (
    <ScheduleContainer>
      <TitleContainer>League Schedule</TitleContainer>
      <ScheduleTable>
        <Table striped>
          <thead style={{backgroundColor:'#E4EDF2', border:'#E4EDF2', borderBottom: 'hidden', fontSize: '12px'}}>
            <tr style={{height: '40px'}}>
              {width > 500 && <th style={{ width: '120px', textAlign: 'right'}}>Date/Time</th>}
              {width > 750 && <th style={{textAlign: 'left'}}>Stadim</th>}
              <th style={{textAlign: 'right'}} colSpan="2">Home Team</th>
              <th style={{ width: '70px'}}></th>
              <th style={{textAlign: 'left'}} colSpan="2">Away Team</th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
            {schedulesData.map((schedule, index) => {
              return (
                <tr key={index}>
                  {width > 500 && <td style={{textAlign: 'right'}}>{moment(schedule.matchDate).format("D.M.YYYY hh:mm")}</td>}
                  {width > 750 && <td style={{textAlign: 'left'}}>{schedule.stadium}</td>}
                  <td style={{textAlign: 'right', fontWeight: 'bold', fontSize: '16'}}>{schedule.homeTeam}</td>
                  <td style={{textAlign: 'right', width: '70px'}}><ScheduleFlagImage src={'https://countryflagsapi.com/svg/'+schedule.homeTeam.toLowerCase()} alt='item' /></td>
                  <td style={{textAlign: 'center', fontWeight: 'bold', fontSize: '16'}}>{schedule.matchPlayed ? schedule.homeTeamScore+' : '+schedule.awayTeamScore : '- : -'}</td>
                  <td style={{textAlign: 'right', width: '70px'}}><ScheduleFlagImage src={'https://countryflagsapi.com/svg/'+schedule.awayTeam.toLowerCase()} alt='item' /></td>
                  <td style={{textAlign: 'left', fontWeight: 'bold', fontSize: '16'}}>{schedule.awayTeam}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </ScheduleTable>
    </ScheduleContainer>
  )
}

export default Schedule;