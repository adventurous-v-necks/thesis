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

  render() {
    const volumeSizing = {
      width: 'auto',
      float: 'right',
    };

    return (
      <span style={{display:'inline-block', height:'auto', width:'100%', marginTop:'0.2em'}}>
        <div className="transportContainer">
          <TimeSig />
          <Tempo />
          <Marker />
          <Controls />
          <div style={volumeSizing}>
            <Knob id="0" />
          </div>
        </div>
        <span style={{backgroundColor:'#efefef', marginTop: '-0.5em', position:'absolute', left:'1em', height:'1em', paddingLeft:'0.5em', paddingRight:'0.5em'}}>Transport Controls</span>
      </span>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Transport);
