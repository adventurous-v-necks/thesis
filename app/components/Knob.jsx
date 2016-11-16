import React from 'react';
import styles from '../App.scss';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';


class Knob extends React.Component {

  constructor(props) {
    super(props)
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  changeVolume(e) {
    let newVol = this.props.allKnobs[this.props.id] + Number(e.movementX);
    newVol = Math.max(0,newVol);
    newVol = Math.min(newVol,255);
    this.props.dispatch({type:'KNOB_TWIDDLE', id: this.props.id, value: newVol});
  }

  handleMouseDown() {
    document.addEventListener ('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', () => document.removeEventListener ('mousemove', this.handleMouseMove));
  }

  handleMouseMove(e) {
    this.changeVolume(e);
  }

  render() {

    let myValue = this.props.allKnobs[this.props.id];
    let style = {};
    let transform = (myValue - 100);
    transform = Math.max(-100, transform);
    transform = Math.min(100, transform);
    style.transform = 'rotate('+transform+'deg)';

    return (
      <div onMouseDown={this.handleMouseDown.bind(this)} style={{cursor: 'crosshair', userSelect:'none'}}>

      <div className="samplerVol">
        <span className="knob-text">{myValue}</span>
        <svg viewBox="-6 -6 12 12" className="dial">
          <defs>
          </defs>
      <g  style={style}  className="knob">
          <g className="knob_gfx" >
            <circle cx="0" cy="0" r="5"/>
              <line x1="0" y1="-1.5" x2="0" y2="-4.4"/>
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
    allKnobs: state.knobs
  };
}

export default connect(mapStateToProps)(Knob);
