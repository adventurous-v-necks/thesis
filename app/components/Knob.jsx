import React from 'react';
import styles from '../App.scss';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';


class Knob extends React.Component {

  constructor(props) {
  super(props)
  const context = this;
  this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  changeVolume(e) {
  var adjustedVol = e.clientX;
  var newVol = adjustedVol%360
  if(newVol < 15){
    newVol =  newVol -100
  }
   this.props.dispatch({type:'KNOB_TWIDDLE', volume: newVol});
  }

handleMouseDown() {
  document.addEventListener ('mousemove', this.handleMouseMove);
}

handleMouseUp() {
  document.removeEventListener ('mousemove', this.handleMouseMove)
}

handleMouseMove(e) {
  this.changeVolume(e)
}

  render() {

    var style = {};
    style.transform = 'rotate('+this.props.volume+'deg)';


    return (
      <div onMouseDown={this.handleMouseDown.bind(this)} onMouseUp={()=> this.handleMouseUp()} >
      {this.props.volume}
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
            <circle cx="0" cy="0" r="5"/>
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

export default connect(mapStateToProps)(Knob);







