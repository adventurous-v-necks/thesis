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
      width: '30%',
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
        <span className="tempoDisplay" id="tempoDisplay" style={style}>{this.props.BPM}</span>
        <div style={faderStyle}>
          <Fader id='tempoFader' />
        </div>
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {
    BPM: state.BPM,
  };
}

export default connect(mapStateToProps)(Tempo);
