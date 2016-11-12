import React from 'react';
import styles from '../App.scss';
import { connect } from 'react-redux';

class Volume extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log('componentWillMount Volume, woot!')  
  }
  render() {
    return (
      <div >
      Volume Stuff!
      </div>
      );
  }
}


function mapStateToProps(state) {
  return {
    volume: state.volume
  };
}

export default connect(mapStateToProps)(Volume);