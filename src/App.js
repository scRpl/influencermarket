import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

//Components
import Navbar from './components/Navbar';

//Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

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

class App extends Component  {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Navbar />
          <div className='container'>
              <Switch>
                <Route exact path='/'>
                  <Home />
                </Route>
                <Route path='/login'>
                  <Login />
                </Route>
                <Route path='/signup'>
                  <Signup />
                </Route>
              </Switch>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
