import React from 'react';
import styles from '../App.scss';
import { connect } from 'react-redux';

class Volume extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log('componentWillMount Volume, woot!')  
  }
  render() {
    return (
      <div className="samplerVol"> 
        <svg viewBox="-6 -6 12 12" className="dial">
          <defs>
            <radialGradient id="knobgradient">
              <stop offset="0" stopColor="yellow"/>
              <stop offset="1" stopColor="silver"/>
            </radialGradient>
          </defs>
      <g className="knob">
        <circle className="knob_center" cx="0" cy="0" r="0.015625"/>
          <g className="knob_gfx">
            <circle cx="0" cy="0" r="5"/>
              <line x1="0" y1="-2.5" x2="0" y2="-4.5"/>
          </g>
      <text className="knob_number"/>
      </g>
      </svg>    
      </div>
      );
  }
}


function mapStateToProps(state) {
  return {
    volume: state.volume
  };
}

export default connect(mapStateToProps)(Volume);