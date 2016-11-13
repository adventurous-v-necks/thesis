import React from 'react';
import styles from '../App.scss';
import {connect} from 'react-redux';
import Transport from './Transport.jsx';
import Synth from './Synth.jsx';

class Player extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="player">
        <Transport />
        <Synth />
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Player);
