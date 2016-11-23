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
          // console.log('=============r: ', r.rooms);
          // console.log('------------stringify: ', JSON.stringify({activeRooms: r.activeRooms}));
          this.props.dispatch({type: 'UPDATE_ACTIVE_ROOMS', activeRooms: r.rooms})
        } /*else {
          console.log('=============could not find requested room');
        }*/
      });
    });
    this.props.dispatch({type: 'ROOM_MENU_TOGGLE'});
  }

  goToSelectedRoom(e) {
    let roomname = e.nativeEvent.target.attributes.value.value;
    this.props.dispatch({type: 'NAVIGATE_ROOM', room: roomname});
  }

  render() {

    let dropDownStyle = {
      maxHeight: '0px',
      paddingRight: '0.5em',
      paddingLeft: '0.5em',
      backgroundColor: '#333',
      borderRadius: '2px',
      transition: 'all 0.3s ease',
    }
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

    let ActiveRooms = '';

    if (this.props.roomsMenuActive) {
      dropDownStyle.maxHeight = '8em';
      ActiveRooms = this.props.activeRooms.map((roomname) => {
        return <li key={this.props.activeRooms.indexOf(roomname)} value={roomname} style={listItemStyle} onClick={this.goToSelectedRoom}>{roomname}</li>
      });
    } else {
      dropDownStyle.maxHeight = '0px';
    }

    return (
      <div className="roomDropDown">
        <i className="joinRoom" aria-hidden="true" style={style} onClick={this.toggleMenu}>Rooms</i>
        <ul style={dropDownStyle}>{ActiveRooms}</ul>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    activeRooms: state.activeRooms,
    roomsMenuActive: state.roomsMenuActive,
  };
}

export default connect(mapStateToProps)(RoomDropDown);

