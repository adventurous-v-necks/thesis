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
  
  transportPlay = () => this.props.dispatch({type: 'PLAY'});
  transportPause() { /* no functionality in MVP */}
  transportRecord = () => {
    if (this.props.recording) {
      this.props.dispatch({type: 'PAUSE_RECORD'});
    } else {
      this.props.dispatch({type: 'AUDIO_RECORD'});
    }
  }
  transportStop = () => this.props.dispatch({type: 'AUDIO_STOP'});

  render() {
    const containerStyle = {
      width: '25%',
      top: '50%',
      transform: 'translateY(-40%)',
    };
    const style = {
      fontSize: '2em',
      height: 'auto',
      width: '1.2em',
      textAlign: 'center',
    };

    const recStyle = Object.assign({}, style, {color: 'red'});

    return (
      <div className="controls" style={containerStyle}>
        <i className="fa fa-play-circle-o" aria-hidden="true" style={style} onClick={this.transportPlay}></i>
        <i className="fa fa-pause-circle-o" aria-hidden="true" style={style} /* onClick={this.transportPause} */></i>
        <i className="fa fa-circle" aria-hidden="true" style={this.props.recording ? recStyle : style} onClick={this.transportRecord}></i>
        <i className="fa fa-stop-circle-o" aria-hidden="true" style={style} onClick={this.transportStop}></i>
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {
    recording: state.recording
  };
}

export default connect(mapStateToProps)(Controls);
