import React from 'react';
import styles from '../App.scss';
import {connect} from 'react-redux';

class Fader extends React.Component {
  constructor(props) {
    super(props);
  }
  report(e) {
    this.props.dispatch({
      type: 'FADER_CHANGE',
      id: this.props.id,
      value: e.nativeEvent.target.value,
    });
  }
  render() {
    var style = {
      cursor: 'crosshair',
    };
    var labelStyle = {fontSize:'0.8em'};
    if (this.props.width) style.width = this.props.width;
    if (this.props.vertical) {
      style.transform = 'rotateZ(270deg)';
      labelStyle.transform = 'rotateZ(270deg)';
      labelStyle.marginLeft = '-5.5em';
    } else {
      labelStyle.position = 'relative';
      labelStyle.top = '0.5em';
      labelStyle.left = this.props.noNeedToCenter ? '0' : '50%';
      labelStyle.transform = this.props.noNeedToCenter ? 'none' : 'translateX(-50%)';
    }

    return (
      <div className="fader" style={{height:'auto',position:'relative', top: this.props.noNeedToCenter ? 'initial' : '50%', cursor:'crosshair'}}>
        <input type="range" id={this.props.id} style={style} onChange={this.report.bind(this)}></input>
        <span style={labelStyle}>{this.props.id}</span>
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Fader);
