import React from 'react';
import styles from '../App.scss';

import {connect} from 'react-redux';

class RoomDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.goToSelectedRoom = this.goToSelectedRoom.bind(this);
  }

  toggleMenu() {
    this.props.dispatch({type: 'ROOM_MENU_TOGGLE'});
  }

  goToSelectedRoom(e) {
    let roomname = e.nativeEvent.target.attributes.value.value;
    this.props.dispatch({type: 'NAVIGATE_ROOM', room: roomname});
    e.preventDefault();
    let theHeaders = new Headers({ "Content-Type": "application/json" });
    fetch('/room/' + roomname, {credentials: 'include', method: 'GET', headers: theHeaders}).then(resp => {
        if (resp.status === 200) {
          console.log('good request');
          // this.context.router.push('/player'); add current state of player for given room
        } else {
          alert('could not find requested room');
        }
    });
  }

  render() {
    console.log('roomdropdown props: ', this.props);

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
      console.log('activeRooms: ', ActiveRooms);
      // console.log('activeRooms type: ', typeof ActiveRooms);
      // ActiveRooms.push('<li>Create a Room</li>');
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

