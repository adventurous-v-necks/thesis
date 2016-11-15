import React from 'react';
import styles from '../App.scss';
import {connect} from 'react-redux';

class Oscillator extends React.Component {
  constructor(props) {
    super(props);
  }

  handleWaveChange = (e) => {
    this.props.dispatch({type: 'OSC_WAVE_CHANGE', osc: e.target.name, wave: e.target.value})
  }

  render() {
    const h1w5 = {
      width: '50%',
      height: '100%',
    }

    const h5w1 = {
      width: "100%", 
      height: "50%"
    };

    const oscNum = `osc${this.props.number}`;
    const osc = this.props.osc[oscNum];

    return (
      <div className={oscNum} style={h1w5}>
        <table style={{width: "100%"}}>
          <tbody style={{width: "100%"}}>
            <tr style={h5w1}>
              <td style={{width: "50%"}}>Volume Here</td>
              <td style={{width: "50%"}}>Detuner Here</td>
            </tr>
            <tr style={h5w1}>
              <td colspan="2">
                <div>
                  <form action="">
                    <input type="radio" name={oscNum} value="1"
                      checked={osc.wave === '1'} onChange={this.handleWaveChange}/>Wave1
                    <input type="radio" name={oscNum} value="2"
                      checked={osc.wave === '2'} onChange={this.handleWaveChange}/>Wave2
                    <input type="radio" name={oscNum} value="3"
                      checked={osc.wave === '3'} onChange={this.handleWaveChange}/>Wave3
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
    osc: state.osc,
  };
}

export default connect(mapStateToProps)(Oscillator);

