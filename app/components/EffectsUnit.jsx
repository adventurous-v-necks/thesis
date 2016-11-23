import React from 'react';
import styles from '../App.scss';
import Knob from './Knob.jsx';

import {connect} from 'react-redux';

class EffectsUnit extends React.Component {
  // We should avoid local component state, except where we don't
  state = {};

  constructor(props) {
    super(props);
    this.removeEffect = this.removeEffect.bind(this);
  }
  componentDidMount() {
    this.setState({
      knob1: this.props.knobs.length - 2,
      knob2: this.props.knobs.length - 1,
    });
  }
  removeEffect(e) {
    this.props.dispatch({type: 'EFFECT_FROM_RACK', id: this.props.id});
  }
  render() {

    const componentStyle = {
      fontSize: '1.2em',
      height: '100%',
      width: '10%',
      border: '1px solid #383838',
      backgroundColor: '#efefef',
      float: 'left',
    };
    const effectNameStyle = {
      height: 'auto',
      width: '100%',
      fontWeight: 'bold',
    };
    const knobContainerStyle = {
      heigth: 'auto',
      width: 'auto',
    };
    const knobStyle = {
      height: 'auto',
      width: '50%',
      textAlign: 'center',
      fontWeight: 'bold',
    };

    return (
      <div style={componentStyle}>
        <div className="effectName" style={effectNameStyle}>
          <i className="fa fa-minus-square-o" aria-hidden="true" style={{float: 'left', paddingLeft: '.02em', fontWeight: 'bold'}} onClick={this.removeEffect}></i>
          {this.props.id.slice(0, this.props.id.length - 2)}
        </div>
        <div className="knobContainer" style={knobContainerStyle}>
          <div style={knobStyle}>
            <Knob key={this.props.knobs.length - 2} id={this.state.knob1}/>
          </div>
          <div style={knobStyle}>
            <Knob key={this.props.knobs.length - 1} id={this.state.knob2}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    knobs: state.knobs,
  };
}

export default connect(mapStateToProps)(EffectsUnit);
