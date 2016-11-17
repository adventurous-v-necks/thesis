import React from 'react';
import styles from '../App.scss';
import {connect} from 'react-redux';
import Transport from './Transport.jsx';
import EffectsRack from './EffectsRack.jsx';
import Sampler from './Sampler.jsx';
import Synth from './Synth.jsx';
import Fader from './Fader.jsx';

class Player extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="player" style={{paddingLeft:'1%', paddingRight:'1%'}}>
        <div style={{width: '100%', height: '4em'}}></div>
        <Transport />
        <Sampler />
        <EffectsRack />
        <Synth />
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Player);
