import React from 'react';

import styles from '../App.scss';
import {connect} from 'react-redux';
import Oscillator from './Oscillator.jsx'

class Oscillators extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      height: '45%',
      width: '50%',
      top: '3%',
      border: '3px solid pink',
      position: 'absolute',
      left: '2%',
    }

    const threeOsc = [1, 2].map(number => {
      return <Oscillator key={number} number={number}/>
    });

    return (
      <div className="oscillators" style={style}>
        {threeOsc}
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Oscillators);
