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
      <div id="transport" style={{border: '1px solid black', width: '25em'}}>
      HERE IS Transport!
        <i className="fa fa-play-circle-o" aria-hidden="true" style={{height: '1em', width: '1em', border: 'solid 1px black'}} onClick={this.transportPlay}></i>
        <i className="fa fa-pause-circle-o" aria-hidden="true" style={{height: '1em', width: '1em', border: 'solid 1px black'}} /* onClick={this.transportPause} */></i>
        <i className="fa fa-circle" aria-hidden="true" style={{height: '1em', width: '1em', border: 'solid 1px black'}} onClick={this.transportRecord}></i>
        <i className="fa fa-stop-circle-o" aria-hidden="true" style={{height: '1em', width: '1em', border: 'solid 1px black'}} onClick={this.transportStop}></i>
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Controls);
