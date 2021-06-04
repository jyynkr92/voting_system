import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, createStore } from 'redux';
import rootReducer, { rootSaga } from 'store';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { Router } from 'react-router';
import { browserHistory } from 'lib/browserHistory';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import 'moment/locale/ko';
moment.locale('ko');

const sagaMiddleware = createSagaMiddleware();
const logger = process.env.NODE_ENV === 'development' ? createLogger() : null;

const store = createStore(
  rootReducer,
  process.env.NODE_ENV === 'development' && logger
    ? applyMiddleware(sagaMiddleware, logger)
    : applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <MuiPickersUtilsProvider utils={MomentUtils} locale={'ko'} libInstance={moment}>
        <App />
      </MuiPickersUtilsProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
