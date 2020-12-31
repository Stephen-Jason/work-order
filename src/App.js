import LoginPage from './components/LoginPage'
import WorkCenter from './components/WorkCenter'
import SuperAdminWorkOrders from './components/SuperAdminWorkOrders'
import CustomerDetails from './components/CustomerDetails'
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
          <ProtectedRoute path='/customerDetails/:id' exact component={CustomerDetails}/>
          <ProtectedRoute path='/workOrders/:name' exact component={SuperAdminWorkOrders}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
