// you need these two imports minimum
import React from 'react';
import styles from '../App.scss';

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
     this.props.dispatch({type:'CREATE_AUDIO_CONTEXT'});
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
            <li className="logo"><Link to="/">DJ Controller</Link></li>
            <li className="menu-item"><Link to="/signup">Sign Up</Link></li>
            <li className="menu-item"><Link to="/signin">Sign In</Link></li>
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
    user: state.user
  };
}

export default connect(mapStateToProps)(App);
