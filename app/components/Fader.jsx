import React from 'react';
import styles from '../App.scss';
import {connect} from 'react-redux';

class Fader extends React.Component {
  constructor(props) {
    super(props);
  }
  report(e) {
    this.props.dispatch({type:'FADER_CHANGE', id: this.props.id, value: e.nativeEvent.target.value});
  }
  render() {
    var style = {};
    if (this.props.width) style.width = this.props.width;
    if (this.props.vertical) style.transform = 'rotateZ(270deg)';
    return (
      <div className="fader">
        <input type="range" style={style} onChange={this.report.bind(this)}></input>
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Fader);
