// you need these two imports minimum
import React from 'react';
import styles from '../App.scss';
import Fader from './Fader.jsx';

import {connect} from 'react-redux';

class Tempo extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }

  render() {
    return (
      <div className="tempo">
        <div className="tempoDisplay">{Math.round((this.props.bpmFactor * (this.props.maxTempo - this.props.minTempo) / 100 ) + this.props.minTempo)} BPM</div>
        <Fader id='tempoFader'/>
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {
    bpmFactor: state.bpmFactor,
    maxTempo: state.maxTempo,
    minTempo: state.minTempo
  };
}

export default connect(mapStateToProps)(Tempo);