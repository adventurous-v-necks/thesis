import React from 'react';
import styles from '../App.scss';
import { connect } from 'react-redux';

class Volume extends React.Component {

  constructor(props) {
    super(props);
  }

  changeVolume(e) {
    console.log('eeeeeeee', e)
  }

  render() {

    return (
      <div className="samplerVol"> 
        <svg onMouseDown={this.changeVolume.bind(this)} onMouseUp={this.changeVolume.bind(this)} viewBox="-6 -6 12 12" className="dial">
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

//   render() {
//     var style = {};
//     if (this.props.width) style.width = this.props.width;
//     if (this.props.vertical) style.transform = 'rotateZ(270deg)';
//     return (
//       <div className="fader">
//         <input type="range" style={style} onChange={this.report.bind(this)}></input>
//       </div>
//     );
//   }
// }



// var style = {};
//     if (this.props.width) style.width = 'rotateX(360deg)';
//     if (this.props.vertical) style.transform = 'rotateZ(360deg)';
//     return (
//       <div className="fader">
//         <input type="range" style={style} onChange={this.report.bind(this)}></input>
//       </div>
//     );








