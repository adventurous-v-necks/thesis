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
  componentDidMount() {

  }
  transportPlay() {
    this.props.dispatch({type: 'PRESS_PLAY'}); //SINGLE DISPATCH
  }
  transportPause() {
    // no functionality in MVP
  }
  transportRecord() {
    this.props.dispatch({type: 'AUDIO_RECORD'});
  }
  transportStop() {
    this.props.dispatch({type: 'AUDIO_STOP'});
  }
  render() {
    return (
      <div className="controls">
        <i className="fa fa-play" aria-hidden="true" style={{width: '2em', height: '2em'}} onClick={this.transportPlay}></i>
        <i className="fa fa-pause" aria-hidden="true" style={{width: '2em', height: '2em'}} /* onClick={this.transportPause} */></i>
        <i className="fa fa-circle" aria-hidden="true" style={{width: '2em', height: '2em'}} onClick={this.transportRecord}></i>
        <i className="fa fa-stop" aria-hidden="true" style={{width: '2em', height: '2em'}} onClick={this.transportStop}></i>
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Controls);
