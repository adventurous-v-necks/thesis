// you need these two imports minimum
import React from 'react';
import styles from '../App.scss';
import Fader from './Fader.jsx';

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
      <div className="tempo">
        128 BPM
        <Fader id='tempoFader'/>
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Tempo);