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
      <div className="transportContainer">
        <TimeSig />
        <Tempo />
        <Marker />
        <Controls />
        <div style={volumeSizing}>
          <Knob id="0" />
        </div>
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Transport);
