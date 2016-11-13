import React from 'react';
import styles from '../App.scss';
import {connect} from 'react-redux';
import Transport from './Transport.jsx';
import Keyboard from './Keyboard.jsx';
import Fader from './Fader.jsx';

class Player extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="player">
        <Fader id="globalVolume" vertical width="8em"/>
        <Transport />
        <Keyboard />
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Player);
