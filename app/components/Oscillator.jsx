import React from 'react';
import styles from '../App.scss';
import {connect} from 'react-redux';

class Oscillator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      width: '33.3%',
      height: '100%',
      textAlign: 'center',
    }

    return (
      <div className="single-oscillator" style={style}>
        Here is
        <br />
        Oscillator
        <br />
        #{this.props.number}
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Oscillator);


