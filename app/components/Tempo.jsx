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
      height: 'auto',
      width: 'auto',
      marginRight: '1em',
    };
    const tempoNumStyle = {
      height: 'auto',
      transform: 'translateY(25%)',
    };
    const faderStyle = {
      height: 'auto',
      transform: 'translateY(15%)',
    };
    return (
      <div className="tempo" style={containerStyle} title="Adjust Global Tempo">
        <span className="tempoDisplay" id="tempoDisplay" style={tempoNumStyle}>{this.props.BPM}</span>
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
