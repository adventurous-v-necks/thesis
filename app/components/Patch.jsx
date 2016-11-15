import React from 'react';
import styles from '../App.scss';
import {connect} from 'react-redux';

class Patch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      height: '75px',
      width: '20%',
      border: '5px solid green',
      // float: 'right',
      position: 'absolute',
      right: '3%',
    }

    return (
      <div className="patch">
        <div style={style}>
          <p>Here is the patch box</p>
        </div>
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Patch);

