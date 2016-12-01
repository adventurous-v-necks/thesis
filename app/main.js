import React from 'react';
import {render} from 'react-dom';

import { Router, Route, browserHistory } from 'react-router';

import App from './components/App.jsx';
import Player from './components/Player.jsx';
import FourOhFour from './components/FourOhFour.jsx';
import LoginForm from './components/LoginForm.jsx';
import Landing from './components/Landing.jsx';
import SignUp from './components/SignUp.jsx';
import reducer from './reducer.js';
import Sampler from './components/Sampler.jsx';
import About from './components/About.jsx';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

// for debugging: export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const store = createStore(reducer);
window.AudioContext = window.AudioContext || window.webkitAudioContext;

// note that when you add a top level route here e.g. / or abc, need to make corresponding changes in server/server.js
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App} title="[Path]">
          <Route path="/" component={Landing} />
          <Route path="/player" component={Player} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/signin" component={LoginForm} />
          <Route path="/about" component={About} />
          <Route path="*" component={FourOhFour}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
