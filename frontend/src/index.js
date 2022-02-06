import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { Provider } from 'react-redux';
import { fetchContainer } from './actions';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './config/theme'

store.dispatch(fetchContainer({slug:'programs', 'root':true}));
store.dispatch(fetchContainer({slug:'organizations', 'root':true}));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
