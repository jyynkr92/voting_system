import MainLayout from 'components/common/MainLayout';
import Main from 'pages/Main';
import SignIn from 'pages/SignIn';
import Signup from 'pages/Signup';
import Vote from 'pages/Vote';
import VoteUpdate from 'pages/VoteUpdate';
import { Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Switch>
      <MainLayout exact path='/' component={Main} />
      <MainLayout exact path='/vote/info/:voteId' component={Vote} />
      <MainLayout exact path='/vote/update/:voteId' component={VoteUpdate} />
      <MainLayout exact path='/signin' component={SignIn} />
      <MainLayout exact path='/signup' component={Signup} />
    </Switch>
  );
}

export default App;
