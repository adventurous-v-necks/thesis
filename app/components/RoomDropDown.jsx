import React from 'react';
import styles from '../App.scss';

import {connect} from 'react-redux';

class RoomDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.goToSelectedRoom = this.goToSelectedRoom.bind(this);
  }

  componentDidMount() {
    if (this.props.currentRoom === '') {
      let userRoom = JSON.parse(window.localStorage.getItem('com.rejuicy.user')).username;
      this.props.dispatch({type: 'NAVIGATE_ROOM', room: userRoom});
    }
  }

  goToSelectedRoom(e) {
    if (e.target.value !== 0) {
      let roomname = e.target.children[e.target.value].innerText;
      fetch('/getState/'+roomname, {credentials:'include'}).then(r => r.json()).then((s) => {
        if (s.status==='ok') {
          this.props.dispatch({type: 'LOAD_SET', set: JSON.parse(s.set).state});
          this.props.dispatch({type: 'NAVIGATE_ROOM', room: roomname});
        } else {
          alert('Sorry, that set seems to be unavailable right now.');
        }
      });
    }
  }

  render() {

    let roomContainer = {
      position: 'relative',
    }
    let dropDownStyle = {
      maxHeight: '0px',
      paddingRight: '0.5em',
      paddingLeft: '0.5em',
      backgroundColor: '#333',
      borderRadius: '2px',
      transition: 'all 0.3s ease',
    }
    let roomDropdownStyle = {
      color: 'white',
      position: 'relative',
      padding: '0 1em',
      border: '1px solid white',
      height: '2em',
      marginRight: '1.5em',
      top: '1.5em',
    };

    let allActiveRooms = this.props.activeRooms.filter(roomname => roomname !== this.props.currentRoom);
    if (this.props.currentRoom !== '' && this.props.currentRoom !== 'Select a Room') {
      allActiveRooms.unshift(this.props.currentRoom);
    }

    return (
      <div className="roomDropDown" style={roomContainer}>
        <select name="room-select" style={roomDropdownStyle} onChange={this.goToSelectedRoom}>
          <option key={"0"} value={"0"}>Select a Room</option>
          {allActiveRooms.map((roomname, i) => (
            <option key={roomname} value={i + 1}>{roomname}</option>
          ))}
        </select>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    activeRooms: state.activeRooms,
    roomsMenuActive: state.roomsMenuActive,
    currentRoom: state.currentRoom,
  };
}

export default connect(mapStateToProps)(RoomDropDown);
