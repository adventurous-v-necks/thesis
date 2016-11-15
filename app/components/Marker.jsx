import React from 'react';
import styles from '../App.scss';

import {connect} from 'react-redux';

class Marker extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }

  render() {
    const style = {
      height: '100%',
      width: '20%',
      textAlign: 'center',
      top: '50%',
      transform: 'translateY(-50%)',
    };

    return (
      <div className="marker" style={style}>
        0000.00.00
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Marker);