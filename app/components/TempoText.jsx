import React from 'react';
import styles from '../App.scss';

import {connect} from 'react-redux';

class TempoText extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  render() {
    return (
      <span className="tempoDisplay" id="tempoDisplay" style={{height:'auto'}}>{this.props.BPM}</span>
    );
  }
}


const mapStateToProps = function(state) {
  return {
    BPM: state.BPM,
  };
}

export default connect(mapStateToProps)(TempoText);
