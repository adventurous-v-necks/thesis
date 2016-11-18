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
      width: '50%',
      height: '100%',
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

    const oscNum = `osc${this.props.number}`;
    const num = this.props.number;
    const oscs = this.props.oscs;

    return (
      <div className={oscNum} style={h1w5}>
        <table style={{width: "100%"}}>
          <tbody style={{width: "100%"}}>
            <tr style={h5w1}>
              <td style={{width: "50%"}}>
                <div style={knobStyle}>
                  <Knob id={num === 1 ? 7 : 8}/>
                </div>
              </td>

              <td style={{width: "50%"}}>
                <div style={knobStyle}>
                  <Knob id={num === 1 ? 9 : 10}/>
                </div>
              </td>
            </tr>
            <tr style={h5w1}>
              <td colSpan="2">
                <div>
                  <form action="">
                    <input type="radio" name={oscNum} value="1"
                      checked={oscs[num] === '1'} onChange={this.handleWaveChange}/>Wave1
                    <input type="radio" name={oscNum} value="2"
                      checked={oscs[num] === '2'} onChange={this.handleWaveChange}/>Wave2
                    <input type="radio" name={oscNum} value="3"
                      checked={oscs[num] === '3'} onChange={this.handleWaveChange}/>Wave3
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
    oscs: state.oscs,
  };
}

export default connect(mapStateToProps)(Oscillator);
