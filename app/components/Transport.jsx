// you need these two imports minimum
import React from 'react';
import styles from '../App.scss';

import {connect} from 'react-redux';

class Transport extends React.Component {
  constructor(props) {
    super(props);
    this.transportPlay = this.transportPlay.bind(this);
  }
  componentDidMount() {

  }
  transportPlay() {
    this.props.dispatch({type: 'TIME_ZERO'});
  }
  render() {
    return (
      <div id="transport" style={{height: '1em'}}>
        <i className="fa fa-play" aria-hidden="true" onClick={this.transportPlay}></i>
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Transport);
