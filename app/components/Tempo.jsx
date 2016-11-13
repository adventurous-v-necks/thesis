// you need these two imports minimum
import React from 'react';
import styles from '../App.scss';
import Fader from './Fader.jsx';

import {connect} from 'react-redux';

class Tempo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bpmFactor: 50, // inherit from fader
      minTempo: 60,
      maxTempo: 180
    }
  }
  componentDidMount() {

  }

  render() {
    return (
      <div className="tempo">
        <div className="tempoDisplay">{(this.state.bpmFactor * (this.state.maxTempo - this.state.minTempo) / 100 ) + this.state.minTempo} BPM</div>
        <Fader id='tempoFader'/>
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {
    bpmFactor: state.bpmFactor
  };
}

export default connect(mapStateToProps)(Tempo);