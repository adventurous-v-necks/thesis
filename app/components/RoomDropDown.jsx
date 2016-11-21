import React from 'react';
import styles from '../App.scss';

import {connect} from 'react-redux';

class RoomDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.goToSelectedRoom = this.goToSelectedRoom.bind(this);
  }

  goToSelectedRoom() {
    this.props.dispatch({type: 'NAVIGATE_ROOM'});
  }

  render() {
    console.log('roomdropdown props: ', this.props);
    let DropDownItems = <li>list element</li>;
    // this.props.activeRooms.map((roomname) => {
    //   return <li key={this.props.activeRooms.indexOf(roomname)} value={roomname} style={} onClick={this.goToSelectedRoom}>{roomname}</li>
    // });

    return (
      <div className="roomDropDown" style={{position: 'absolute', right: '0'}}>
        DropDown
        <ul>{DropDownItems}</ul>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    activeRooms: state.activeRooms,
  };
}

export default connect(mapStateToProps)(RoomDropDown);
