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

  goToSelectedRoom() {
    this.props.dispatch({type: 'NAVIGATE_ROOM'});
  }

  render() {
    console.log('roomdropdown props: ', this.props);

    // let dropDownStyle = {
    //   height: '100%',
    //   width: '100%',
    // };
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
      // padding: '.05em .1em 0 .1em',
      // marginTop: '-0.35em',
      // fontSize: '2em',
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
        // console.log('roomname: ', roomname);
        return <li key={this.props.activeRooms.indexOf(roomname)} value={roomname} style={listItemStyle} onClick={this.goToSelectedRoom}>{roomname}</li>
      });
      // console.log('activeRooms: ', ActiveRooms);
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
