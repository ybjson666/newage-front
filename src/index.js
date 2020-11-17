import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { Provider } from 'react-redux';
import store, { history } from '@/store';
import './index.less';
import App from './App';
import * as serviceWorker from './serviceWorker';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


ReactDOM.render(
  <Provider store={store}>
    <div className="cmcFlex">
      <div className="cmcFlexNone" id="main">

      </div>
      <div className="cmcFlexAuto">
        <Router history={history}>
          <App/>
        </Router>
      </div>
    </div>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
