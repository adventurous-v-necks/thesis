// you need these two imports minimum
import React from 'react';
import styles from './App.scss';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {connect} from 'react-redux';

// To get the leaveHook for React Router, links must be <Link to=> not <a href=>
import {Link} from 'react-router';

class App extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    let xhr = new XMLHttpRequest();
     xhr.open('get', '/getLoggedInUsername');
     xhr.onload = () => {
       this.props.dispatch({type: 'STORE_USER', who: this.response});
     };
     xhr.send();
  }
  // a few other React methods:
  // componentWillMount() {}
  // shouldComponentUpdate() { render is only called if this is true}
  // componentWillUpdate() {}
  // componentDidUpdate() {}
  // componentWillUnmount() {}
  render() {
    return (
      <div id="app">
        <nav>
          <ul>
            <li className="logo"><a href="/">DJ Controller</a></li>
            <li className="menu-item"><a href="/signup">Sign Up</a></li>
            <li className="menu-item"><a href="/signin">Sign In</a></li>
          </ul>
        </nav>
        <ReactCSSTransitionGroup component="div" transitionName="page-transition" transitionEnterTimeout={100} transitionLeaveTimeout={100}>
          {React.cloneElement(this.props.children, {key: this.props.location.key})}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    numClicks: state.clicks,
    text: state.text,
    user: state.user
  };
}

export default connect(mapStateToProps)(App);
