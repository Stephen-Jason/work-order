import LoginPage from './components/LoginPage'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'


import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact render={() => <LoginPage />} />
          <ProtectedRoute path='/home/:name' exact component={Home}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
