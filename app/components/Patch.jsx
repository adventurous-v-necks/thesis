import React from 'react';
import styles from '../App.scss';
import {connect} from 'react-redux';

class Patch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="patch">
        <div style={{
          height: "50px",
          width: "250px",
          border: "5px solid green",
        }}>
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

