// you need these two imports minimum
import React from 'react';
import styles from '../App.scss';

import {connect} from 'react-redux';

class Tempo extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }

  render() {
    // <Fader /> component to be added, being built elsewhere
    return (
      <div className="transport" id="tempo">
        128 BPM
      </div>
        // <Fader id='tempoFader'/>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Tempo);