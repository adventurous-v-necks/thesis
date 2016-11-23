// you need these two imports minimum
import React from 'react';
import styles from '../App.scss';
import RoomDropDown from './RoomDropDown.jsx';

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
    // no longer using this: now, if user is logged in, there's a cookie
    // let xhr = new XMLHttpRequest();
    //  xhr.open('get', '/getLoggedInUsername');
    //  xhr.onload = () => {
    //    this.props.dispatch({type: 'STORE_USER', who: this.response});
    //  };
    //  xhr.send();
     this.props.dispatch({type:'CREATE_AUDIO_CONTEXT'});
  }
  logOut(e) {
    e.preventDefault();
    window.localStorage.removeItem('com.rejuicy.user');
    this.props.dispatch({type:'USER_LOGOUT'});
    fetch('/logout', {credentials:'include'});
    this.context.router.push('/');
  }

  customNavbar() {
    return this.props.loggedIn ? (
      <span>
      <li className="menu-item"><Link to="/signout" onClick={this.logOut.bind(this)}>Sign Out</Link></li>
      <li className="menu-item"><Link to="/profile">{JSON.parse(window.localStorage.getItem('com.rejuicy.user')).username}</Link></li>
      <li className="menu-item"><RoomDropDown /></li>
      </span>
      ) : (
      <span>
      <li className="menu-item"><Link to="/signup">Sign Up</Link></li>
      <li className="menu-item"><Link to="/signin">Sign In</Link></li>
      </span>
      );
  }
  render() {
    return (
      <div id="app">
        <nav>
          <ul>
            <li className="logo"><Link to="/">DJ Controller</Link></li>
            {this.customNavbar.call(this)}
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
    loggedIn: state.loggedIn
  };
}

export default connect(mapStateToProps)(App);
