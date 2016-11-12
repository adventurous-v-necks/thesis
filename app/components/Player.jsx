import React from 'react';
import styles from '../App.scss';
import {connect} from 'react-redux';
import Keyboard from './Keyboard.jsx';

class Player extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="player">
        <Keyboard />
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Player);

