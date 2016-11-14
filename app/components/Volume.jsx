import React from 'react';
import styles from '../App.scss';
import { connect } from 'react-redux';

class Volume extends React.Component {

  constructor(props) {
    super(props);
  }

  changeVolume(e) {
  console.log('b4', this.props.volume)
  var adjustedVol = e.nativeEvent.clientX * 4;
  var newVol = adjustedVol + 180
    this.props.dispatch({type:'KNOB_TWIDDLE', volume: newVol});
   this.forceUpdate()
  }

  render() {

    var style = {};
    style.transform = 'rotate('+this.props.volume+'deg)';

    return (
      <div onMouseMove={this.changeVolume.bind(this)} onMouseUp={this.changeVolume.bind(this)}>
      <div className="samplerVol"> 
        <svg viewBox="-6 -6 12 12" className="dial">
          <defs>
            <radialGradient id="knobgradient">
              <stop offset="0" stopColor="yellow"/>
              <stop offset="1" stopColor="silver"/>
            </radialGradient>
          </defs>
      <g  style={style}  className="knob">
        <circle className="knob_center" cx="0" cy="0" r="0.015625"/>
          <g className="knob_gfx" >
            <circle onMouseDown={this.changeVolume.bind(this)} onMouseUp={this.changeVolume.bind(this)} cx="0" cy="0" r="5"/>
              <line x1="0" y1="-2.5" x2="0" y2="-4.5"/>
          </g>
      <text className="knob_number"/>
      </g>
      </svg>    
      </div>
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







