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
    let displayValue = myValue
    if (this.props.id === 9 || this.props.id === 10) { 
      displayValue = Math.round((displayValue - 127.5) * (200/255));
    }


    const labelFunc = (label) => {
      const spanStyle = {
        position: 'relative',
        height: '50%',
        fontSize: '90%',
        bottom: '1.5em',
        textAlign: 'center',
        backgroundColor: '#efefef',
        textTransform: 'uppercase',
        left: '0em',
        paddingLeft: '0.5em',
        paddingRight: '0.5em',
        marginRight: 'auto',
        marginLeft: 'auto',
      }
      if (label) {
        return (
          <span style={spanStyle}>{label}</span>
        );
      } else {
        return;
      }
    }

    

    return (
      <div title={this.props.title} onMouseDown={this.handleMouseDown.bind(this)}
        style={{cursor: 'crosshair', userSelect:'none', height:'auto', fontWeight: 'bold'}}>
        <div className="samplerVol">
          <span className="knob-text" style={{fontWeight: 'bold'}}>{displayValue}</span>
          <div className="dialANDlabel"style={{align: 'center', fontWeight: 'bold'}}>
            <svg viewBox="-6 -6 12 12" className="dial">
              <g  style={style}  className="knob">
                <g className="knob_gfx" >
                  <circle cx="0" cy="0" r="5"/>
                    <line x1="0" y1="-0.6" x2="0" y2="-4.4"/>
                </g>
              <text style={{color: '#474747', fontWeight: 'bold'}} className="knob_number"/>
              </g>
            </svg>
            {labelFunc(this.props.label)}
          </div>
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
