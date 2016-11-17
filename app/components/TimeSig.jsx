// you need these two imports minimum
import React from 'react';
import styles from '../App.scss';

import {connect} from 'react-redux';

class TimeSig extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }

  render() {
    const style = {
      height: 'auto',
      width: '10%',
      textAlign: 'center',
      top: '50%',
      transform: 'translateY(-50%)',
    };

    return (
      <div className="timeSig" style={style}>
        4/4
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(TimeSig);
