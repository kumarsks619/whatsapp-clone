import './App.css';
import React, { useContext } from 'react'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login';
import { StateContext } from './ContextAPI'


function App() {

  const [state] = useContext(StateContext)

  return (
    <div className="app">
      {
        !state.user ? (
          <Login />
        ) : (
          <div className="app__body">
            <Router>
              <Sidebar />
              <Switch>
                <Route path="/rooms/:roomId">
                  <Chat />
                </Route>
                <Route path="/">
                  <Chat />
                </Route>
              </Switch>
            </Router>
          </div>
        )
      }
    </div>
  );
}

export default App;
