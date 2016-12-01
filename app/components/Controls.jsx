// you need these two imports minimum
import React from 'react';
import styles from '../App.scss';

import {connect} from 'react-redux';

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.transportPlay = this.transportPlay.bind(this);
    this.transportPause = this.transportPause.bind(this);
    this.transportRecord = this.transportRecord.bind(this);
    this.transportStop = this.transportStop.bind(this);
  }
  transportPlay() {
    this.props.dispatch({type: 'PLAY'});
  }
  transportPause() { /* no functionality in MVP */}
  transportRecord = () => {
      this.props.dispatch({type: 'AUDIO_RECORD'});
  }
  transportStop = () => this.props.dispatch({type: 'AUDIO_STOP'});

  render() {
    const containerStyle = {
      width: 'auto',
      top: '50%',
      transform: 'translateY(-50%)',
      height: 'auto',
      verticalAlign: 'middle',
    };
    const style = {
      fontSize: '2em',
      height: 'auto',
      width: '1.2em',
      textAlign: 'center',
      cursor: 'pointer',
    };

    const recStyle = Object.assign({}, style, {color: 'red'});

    return (
      <div className="controls" style={containerStyle}>
        <i title="Play back" className="fa fa-play-circle-o" aria-hidden="true" style={style} onClick={this.transportPlay}></i>
        <i title="Pause audio" className="fa fa-pause-circle-o" aria-hidden="true" style={style} /* onClick={this.transportPause} */></i>
        <i title="Start/stop recording" className="fa fa-circle" aria-hidden="true" style={this.props.recording ? recStyle : style} onClick={this.transportRecord}></i>
        <i title="Stop audio" className="fa fa-stop-circle-o" aria-hidden="true" style={style} onClick={this.transportStop}></i>
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {
    recording: state.state.recording
  };
}

export default connect(mapStateToProps)(Controls);
