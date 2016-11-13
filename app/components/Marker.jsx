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
      <div className="marker">
        Marker PlaceHolder
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Marker);