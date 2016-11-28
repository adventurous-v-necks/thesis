import React from 'react';
import styles from '../App.scss';

import {connect} from 'react-redux';

class RoomDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.goToSelectedRoom = this.goToSelectedRoom.bind(this);
  }

  toggleMenu(e) {
    e.preventDefault();
    let theHeaders = new Headers({ "Content-Type": "application/json" });
    fetch('/liveRooms', {credentials: 'include', method: 'GET', headers: theHeaders}).then(resp => {
      resp.json().then(r => {
        if (r.status === 'ok') {
          this.props.dispatch({type: 'UPDATE_ACTIVE_ROOMS', activeRooms: r.rooms})
        } 
      });
    });
    this.props.dispatch({type: 'ROOM_MENU_TOGGLE'});
  }

  goToSelectedRoom(e) {
    console.log('e.target.children[e.target.value].innerText: ', e.target.children[e.target.value].innerText);
    // let roomname = e.nativeEvent.target.attributes.value.value;
    // let roomname = e.target.children[e.target.value].innerText;
    let roomname = e.target.children[e.target.value].innerText;
    this.props.dispatch({type: 'NAVIGATE_ROOM', room: roomname});
  }



  render() {

    // console.log('active rooms: ', this.props.activeRooms);

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
      left: '5em',
      position: 'relative',
      padding: '0 1em',
      border: '1px solid white',
      height: '2em',
      top: '1.5em',
    };
    
    const style = {
      height: '100%',
      display: 'block',
      height: 'auto',
      color: 'white',
      fontFamily: 'Permanent Marker',
    }
    const listItemStyle = {
      display: 'block',
      height: 'auto',
      color: '#efefef',
      cursor: 'pointer',
    }

    // let ActiveRooms = '';

    // if (this.props.roomsMenuActive) {
    //   dropDownStyle.maxHeight = '8em';
    //   ActiveRooms = this.props.activeRooms.map((roomname) => {
    //     return <li key={this.props.activeRooms.indexOf(roomname)} value={roomname} style={listItemStyle} onClick={this.goToSelectedRoom}>{roomname}</li>
    //   });
    // } else {
    //   dropDownStyle.maxHeight = '0px';
    // }

    // let allActiveRooms = this.props.activeRooms;
    // let allActiveRooms = this.props.activeRooms.filter(roomname => roomname !== this.props.currentRoom);
    // allActiveRooms.unshift(this.props.currentRoom);

    let activeRoomsList = this.props.activeRooms;
    activeRoomsList.unshift('Select a Room');
    
    // console.log('allActiveRooms: ', allActiveRooms);

    return (
      <div className="roomDropDown">
        <select name="room-select" style={roomDropdownStyle} onChange={this.goToSelectedRoom}>
          {activeRoomsList.map((roomname, i) => (
            i === 0
            ?
            <option key={'Select a Room'} value={i} selected>{roomname}</option>
            : 
            <option key={activeRoomsList.indexOf(roomname)} value={i}>{roomname}</option>
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

