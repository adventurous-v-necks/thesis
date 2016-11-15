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
    const containerStyle = {
      height: '100%',
      width: '32%',
    };
    const style = {
      height: 'auto',
      transform: 'translateY(25%)',
    };
    const faderStyle = {
      height: 'auto',
      transform: 'translateY(15%)',
    };
    return (
      <div className="tempo" style={containerStyle}>
        <div className="tempoDisplay" style={style}>{Math.round((this.props.bpmFactor * (this.props.maxTempo - this.props.minTempo) / 100 ) + this.props.minTempo)} BPM</div>
        <div style={faderStyle}>
          <Fader id='tempoFader'/>
        </div>
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