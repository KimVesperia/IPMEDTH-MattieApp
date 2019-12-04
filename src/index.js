import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import SignUp from './Signup';

const theme = createMuiTheme({
    palette: {
       primary: {
          light: '#3b8ad9',
          main: '#3f5cfc',
          dark: '#115293'
       },
       secondary: {
         main: '#3f5cfc',
       },
    },
    typography: { 
       useNextVariants: true
    }
 });

ReactDOM.render(
    <MuiThemeProvider theme = { theme }>
       <App/>
    </MuiThemeProvider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();