// you need these two imports minimum
import React from 'react';
import styles from '../App.scss';
import Fader from './Fader.jsx';

import {connect} from 'react-redux';

class Tempo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempo: 128
    }
  }
  componentDidMount() {

  }

  render() {
    return (
      <div className="tempo">
        {this.state.tempo} BPM
        <Fader id='tempoFader'/>
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Tempo);