import LoginPage from './components/LoginPage'
import WorkCenter from './components/WorkCenter'
import ProtectedRoute from './components/ProtectedRoute'


import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact render={() => <LoginPage />} />
          <ProtectedRoute path='/home/:name' exact component={WorkCenter}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
