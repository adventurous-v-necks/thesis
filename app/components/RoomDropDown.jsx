import React from 'react';
import styles from '../App.scss';

import {connect} from 'react-redux';

class RoomDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.getActiveRooms = this.getActiveRooms.bind(this);
    this.goToSelectedRoom = this.goToSelectedRoom.bind(this);
  }

  componentDidMount() {
    this.getActiveRooms();
  }

  getActiveRooms() {
    // e.preventDefault();
    console.log('get active rooms called')
    let theHeaders = new Headers({ "Content-Type": "application/json" });
    fetch('/liveRooms', {credentials: 'include', method: 'GET', headers: theHeaders}).then(resp => {
      resp.json().then(r => {
        if (r.status === 'ok') {
          this.props.dispatch({type: 'UPDATE_ACTIVE_ROOMS', activeRooms: r.rooms})
        } 
      });
    });
    // this.props.dispatch({type: 'ROOM_MENU_TOGGLE'});
  }

  goToSelectedRoom(e) {
    // console.log('event target value: ', e.target.value);
    console.log('event target: ')
    console.log(e.target.children[e.target.value].innerText)
    if (e.target.value !== 0) {
      let roomname = e.target.children[e.target.value].innerText;
      console.log('navigating to new room: ', roomname);
      this.props.dispatch({type: 'NAVIGATE_ROOM', room: roomname});
    }
  }

  render() {

    console.log('active rooms: ', this.props.activeRooms);


    let roomContainer = {      
      position: 'relative',
      top: '1.08em',
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
      // left: '5em',
      position: 'relative',
      padding: '0 1em',
      border: '1px solid white',
      height: '2em',
      // top: '.3em',
      // textAlign: 'right',
      marginRight: '1.5em',
    };
    
    const style = {
      height: '100%',
      display: 'block',
      height: 'auto',
      color: 'white',
      fontFamily: 'Permanent Marker',
    }
    const listItemStyle = {
    //   display: 'block',
    //   height: 'auto',
    //   color: '#efefef',
    //   cursor: 'pointer',
      textAlign: 'right',
    }

    // this.getActiveRooms();

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
        // <i className="joinRoom" aria-hidden="true" style={style} onClick={this.toggleMenu}>Rooms</i>
        // <ul style={dropDownStyle}>{ActiveRooms}</ul>

const mapStateToProps = function(state) {
  return {
    activeRooms: state.activeRooms,
    roomsMenuActive: state.roomsMenuActive,
    currentRoom: state.currentRoom,
  };
}

export default connect(mapStateToProps)(RoomDropDown);

