import React, { Component } from 'react';
import './App.css';
import { Router } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

//Components
import Navbar from './components/Navbar';

//Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import User from './pages/user';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6d6d6d',
      main: '#424242',
      dark: '#1b1b1b',
      contrastText: '#fff',
    },
    secondary: {
      light: '#7a7cff',
      main: '#304ffe',
      dark: '#0026ca',
      contrastText: '#fff',
    },
  },
});

const history = createBrowserHistory()

class App extends Component  {
  render() {
    return (
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Navbar history={history} />
            <div className='container'>
                <Switch>
                  <Route path='/login'>
                    <Login history={history} />
                  </Route>
                  <Route path='/signup'>
                    <Signup history={history} />
                  </Route>
                  <Route path='/users/:name'>
                    <User history={history} />
                  </Route>
                  <Route exact path='/'>
                    <Home />
                  </Route>
                </Switch>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
