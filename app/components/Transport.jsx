// you need these two imports minimum
import React from 'react';
import styles from '../App.scss';

import {connect} from 'react-redux';

class Transport extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }

  render() {
    // <Volume /> component to be added, being built elsewhere
    return (
      <div id="transport" style={{border: '1px solid black', width: '25em'}}>
      HERE IS Transport!
        <TimeSig />
        <Tempo />
        <Marker />
        <Controls />
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Transport);
