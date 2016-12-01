// you need these two imports minimum
import React from 'react';
import styles from '../App.scss';
import RoomDropDown from './RoomDropDown.jsx';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {connect} from 'react-redux';

import {fetchRooms} from '../fetchRooms.js';
import {store} from '../main.js';

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
     this.props.dispatch({type:'CREATE_AUDIO_CONTEXT'});
     if (navigator.requestMIDIAccess) {
       navigator.requestMIDIAccess({sysex: false}).then((accessObj)=> {
         this.props.dispatch({type: 'MIDI_OK', midiObj: accessObj});
       }, (err) => console.log(err));
     }
  }
  componentDidMount() {
    let newUserRoom = JSON.parse(window.localStorage.getItem('com.rejuicy.user')).username;
    store.getState().state.socket.emit('room', { joinRoom: newUserRoom});
    fetchRooms();
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
      <li className="room-select"><RoomDropDown /></li>
      </span>
      ) : (
      <span>
      <li className="menu-item" ><Link href={'/auth/facebook'}>facebook login</Link></li>
      <li className="menu-item"><Link to="/signup">Sign Up</Link></li>
      <li className="menu-item"><Link to="/signin">Sign In</Link></li>
      </span>
      );
  }
  newMidi(e) {
    if (e.target.value != -1) {
      let name = e.target.children[Number(e.target.value)+1].innerText;//plus one cos of dummy entry at top
      this.props.dispatch({type:'CHANGE_MIDI', device: Number(e.target.value), name: name});
    }
  }
  render() {
    let midiDropdownStyle = {
      color: 'white',
      left: '5em',
      position: 'relative',
      padding: '0 1em',
      border: '1px solid white',
      height: '2em',
      top: '1.5em',
    };

    return (
      <div id="app">
        <nav>
          <ul>
            <li className="logo"><Link to="/">DJ Controller</Link></li>
            <li><select name="midi-select" style={midiDropdownStyle} onChange={this.newMidi.bind(this)}>
              <option value="-1">Choose MIDI device</option>
              {this.props.midiDevices.map((dev,i) => (
                <option key={dev} value={i}>{dev}</option>
              ))}
            </select></li>
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
    loggedIn: state.user.loggedIn,
    midiDevices: state.state.midiDevices,
  };
}

export default connect(mapStateToProps)(App);
