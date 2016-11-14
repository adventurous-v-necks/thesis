import React from 'react';
import styles from '../App.scss';
import {connect} from 'react-redux';
import Keyboard from './Keyboard.jsx';
import Patch from './Patch.jsx';
import Volume from './Volume.jsx';

class Synth extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="synth">
        <Patch />
        {/* <Volume /> */}
        <Keyboard />
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Synth);
