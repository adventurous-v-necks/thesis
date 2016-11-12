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
      <svg>
        <circle cx={50} cy={50} r={10} fill="red" />
      </svg>      
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