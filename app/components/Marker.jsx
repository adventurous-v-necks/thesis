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
    return (
      <div className="transport" id="marker">
        Marker
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Marker);