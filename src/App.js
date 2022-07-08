import { Route, Switch } from 'react-router-dom';
import Footer from './components/footer/footer.component';
import Header from './components/header/header.component';
import Leaderboard from './pages/leaderboard/leaderboard.component';
import NotFound from './pages/not-found/not-found.component';
import Schedule from './pages/schedule/schedule.component';

const App = () => {
  return (
    <div className='App'>
      <Header/>
      <Switch>
        <Route exact path="/" component={Schedule}/>
        <Route path="/schedule" component={Schedule}/>
        <Route path="/leaderboard" component={Leaderboard}/>
        <Route component={NotFound} />
      </Switch>
      <Footer/>
    </div>
  );
};

export default App;
