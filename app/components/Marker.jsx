import React from 'react';
import styles from '../App.scss';

import {connect} from 'react-redux';

class Marker extends React.Component {
  constructor(props) {
    super(props);
  }

  formatTime = time => {
    // assume time comes in in seconds
    const leadingSecZero = (t) => {
      const floor = Math.floor(t % 60).toString();
      if (t % 60 >= 10) {
        return floor;
      } else {
        return '0' + floor;
      }
    }

    const seconds = leadingSecZero(time);
    const minutes = Math.floor(time / 60).toString();
    
    const shortTime = minutes + ':' + seconds;

    if (time > 3600) {
      const hours = Math.floor(time / (60 * 60)).toString();
      return hours + ':' + shortTime;
    } else {
      return shortTime;
    }
  }

  render() {
    const style = {
      height: '100%',
      width: '20%',
      textAlign: 'center',
      top: '50%',
      transform: 'translateY(-50%)',
    };

    console.log(this.props);

    return (
      <div className="marker" style={style}>
        {this.props.timeZero ? this.formatTime(this.props.timeZero) : '0:00'}
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {
    timeZero: state.timeZero
  };
}

export default connect(mapStateToProps)(Marker);
