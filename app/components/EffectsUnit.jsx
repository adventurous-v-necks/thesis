import React from 'react';
import styles from '../App.scss';
import Knob from './Knob.jsx';

import {connect} from 'react-redux';

class EffectsDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.removeEffect = this.removeEffect.bind(this);
  }
  componentDidMount() {

  }
  removeEffect(e) {
    this.props.dispatch({type: 'EFFECT_FROM_RACK', effect: this.props});
  }
  render() {

    const componentStyle = {
      fontSize: '1.2em',
      height: '100%',
      width: '25%',
      border: '1px solid #383838',
      backgroundColor: '#efefef',
      float: 'left',
    };
    const effectNameStyle = {
      height: 'auto',
      width: '100%',
      border: '1px solid blue',
    };
    const knobContainerStyle = {
      heigth: 'auto',
      width: 'auto',
      // border: '1px solid green',
    };
    const knobStyle = {
      height: 'auto',
      width: '50%',
      textAlign: 'center',
    };

    return (
      <div style={componentStyle}>
        <div className="effectName" style={effectNameStyle}>
          <i className="fa fa-minus-square-o" aria-hidden="true" style={{float: 'left', paddingLeft: '.02em'}} onClick={this.removeEffect}></i>
          {this.props.id}
        </div>
        <div className="knobContainer" style={knobContainerStyle}>
          <div style={knobStyle}>
            <Knob />
          </div>
          <div style={knobStyle}>
            <Knob />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(EffectsDropDown);
