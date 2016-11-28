import React from 'react';
import styles from '../App.scss';
import TimeSig from './TimeSig.jsx';
import Tempo from './Tempo.jsx';
import Marker from './Marker.jsx';
import Controls from './Controls.jsx';
import Knob from './Knob.jsx';

import {connect} from 'react-redux';

class Transport extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  syncToggle() {
    this.props.dispatch({type:'SYNC_TOGGLE'});
  }

  render() {
    const volumeSizing = {
      width: 'auto',
      float: 'right',
      height: 'auto',
      textAlign: 'center',
    };
    let syncStyle = {
      width:'auto',
      height:'auto',
      backgroundColor: this.props.syncOn ? 'red' : '#efefef',
      border: '1px solid black',
      cursor: 'pointer',
      padding: '0.3em 0.6em',
      position: 'relative',
      top: '-0.72em',
    };

    return (
      <span style={{display:'inline-block', height:'auto', width:'100%', marginTop:'0.2em'}}>
        <div className="transportContainer">
          <TimeSig />
          <Tempo />
          <span style={syncStyle} onClick={this.syncToggle.bind(this)}>SYNC</span>
          <Marker />
          <Controls />
          <span style={volumeSizing}>
            <Knob id="0" title="Adjust Volume" label='Master'/>
          </span>
        </div>
        <span style={{backgroundColor:'#efefef', marginTop: '-0.5em', position:'absolute', left:'1em', height:'1em', paddingLeft:'0.5em', paddingRight:'0.5em'}}>Transport Controls</span>
      </span>
    );
  }
}


const mapStateToProps = function(state) {
  return {
    syncOn : state.syncOn
  };
}

export default connect(mapStateToProps)(Transport);
