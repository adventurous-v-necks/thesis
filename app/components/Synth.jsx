import React from 'react';
import styles from '../App.scss';
import {connect} from 'react-redux';
import Keyboard from './Keyboard.jsx';

class Synth extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="synth">
        <Keyboard />
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Synth);
