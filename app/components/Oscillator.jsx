import React from 'react';
import styles from '../App.scss';
import Knob from './Knob.jsx';
import {connect} from 'react-redux';

class Oscillator extends React.Component {
  constructor(props) {
    super(props);
  }

  handleWaveChange = (e) => {
    this.props.dispatch({
      type: 'OSC_WAVE_CHANGE',
      wave: e.target.value,
      oscnum: this.props.number
    })
  }

  render() {
    const h1w5 = {
      width: '48%',
      height: '100%',
      border: '2px solid #383838',
      marginRight: '1%'
    }

    const h5w1 = {
      width: "100%",
      height: "50%",
    };
    const knobStyle = {
      width: '100%',
      height: 'auto',
      textAlign: 'center',
    };

    const radioLabelStyle = {
      position: 'relative',
      left: '15%'
    }

    const oscNum = `osc${this.props.number}`;
    const num = this.props.number;
    const oscwaves = this.props.oscwaves;

    return (
      <div className={oscNum} style={h1w5}>
        <table style={{width: "100%"}}>
          <tbody style={{width: "100%"}}>
            <tr style={h5w1}>
              <td style={{width: "50%"}}>
                <div style={knobStyle}>
                  <Knob id={num === 1 ? 7 : 8} label="Volume"/>
                </div>
              </td>

              <td style={{width: "50%"}}>
                <div style={knobStyle}>
                  <Knob id={num === 1 ? 9 : 10} label="Detune"/>
                </div>
              </td>
            </tr>
            <tr style={h5w1}>
              <td colSpan="2">
                <div>
                  <form action="" style={{position: 'relative', top: '-15%'}}>
                    <input type="radio" style={radioLabelStyle} name={oscNum} value="sine"
                      checked={oscwaves[num] === 'sine'} onChange={this.handleWaveChange}/>Sine
                    <input type="radio" style={radioLabelStyle} name={oscNum} value="square"
                      checked={oscwaves[num] === 'square'} onChange={this.handleWaveChange}/>Square
                    <input type="radio" style={radioLabelStyle} name={oscNum} value="sawtooth"
                      checked={oscwaves[num] === 'sawtooth'} onChange={this.handleWaveChange}/>Sawtooth
                  </form>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {
    oscwaves: state.state.oscwaves,
  };
}

export default connect(mapStateToProps)(Oscillator);
