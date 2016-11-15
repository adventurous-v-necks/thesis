import React from 'react';
import styles from '../App.scss';
import TimeSig from './TimeSig.jsx';
import Tempo from './Tempo.jsx';
import Marker from './Marker.jsx';
import Controls from './Controls.jsx';
import Volume from './Volume.jsx';

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
      <div className="transportContainer">
        <TimeSig />
        <Tempo />
        <Marker />
        <Controls />
        <div style={volumeSizing}>
          <Volume />
        </div>
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {
    bpmFactor: state.bpmFactor
  };
}

export default connect(mapStateToProps)(Transport);
