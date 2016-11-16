import React from 'react';
import styles from '../App.scss';
import {connect} from 'react-redux';

class Marker extends React.Component {
  constructor(props) {
    super(props);
  }

  formatTime = (time) => {
    // assume time comes in in seconds
    const leadingZero = (t, seconds) => {
      const floor = Math.floor(seconds ? t % 60 : t / 60).toString();
      if (seconds ? t % 60 >= 10 : t / 60 >= 10) {
        return floor;
      } else {
        return '0' + floor;
      }
    }

    const seconds = leadingZero(time, true);
    // if we don't want leading zero reinstate lower line
    // const minutes = Math.floor(time / 60).toString();
    const minutes = leadingZero(time, false);
    const tenths = Math.round(time * 10).toString().slice(-1);
    
    const shortTime = minutes + ':' + seconds + '.' + tenths;

    if (time > 3600) {
      const hours = Math.floor(time / (60 * 60)).toString();
      return hours + ':' + shortTime;
    } else {
      return shortTime;
    }
  }

  componentDidMount() {
    this.timeMarker = setInterval( () => {
      this.props.dispatch({type: 'MARKER_UPDATE'});
    }, 50);
  }

  componentWillUnmount() {
    clearInterval(this.timeMarker);
  }

  render() {
    const getTime = () => {
      let time;
      if (this.props.recordTimeZero) {
        time = this.props.timeZero - this.props.recordTimeZero;
      } else {
        time = 0
      }
      return this.formatTime(time);
    };
    const style = {
      height: '100%',
      width: '20%',
      textAlign: 'center',
      top: '50%',
      transform: 'translateY(-50%)',
      fontFamily: '"Lucida Console", Monaco, monospace',
      fontSize: '150%',
    };

    return (
      <div className="marker" style={style}>
        {getTime()}
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {
    timeZero: state.timeZero,
    recordTimeZero: state.recordTimeZero,
  };
}

export default connect(mapStateToProps)(Marker);
