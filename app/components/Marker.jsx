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
      let floor = Math.floor(seconds ? t % 60 : t / 60).toString();
      if (floor < 0) { floor *= -1 }
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

    return shortTime;
  }

  componentDidMount() {
    this.timeMarker = setInterval( () => {
      !this.props.recording ? null : this.props.dispatch({type: 'MARKER_UPDATE'});
    }, 50);
  }

  componentWillUnmount() {
    clearInterval(this.timeMarker);
  }

  render() {
    const formattedTime = this.formatTime(this.props.markerTime);

    const style = {
      height: 'auto',
      width: '20%',
      textAlign: 'center',
      top: '50%',
      transform: 'translateY(-50%)',
      fontFamily: '"Lucida Console", Monaco, monospace',
      fontSize: '1.5em',
      verticalAlign: 'middle',
    };

    return (
      <div className="marker" style={style}>
        {formattedTime}
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {
    recording: state.state.recording,
    markerTime: state.state.markerTime
  };
}

export default connect(mapStateToProps)(Marker);
