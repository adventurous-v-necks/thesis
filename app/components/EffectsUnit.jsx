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
  customKnobBuild() {
    return this.props.id.includes('MOOG') ? (
      <div className="knob-container">
        <div className="double-knob">
          <Knob key={this.props.knobs.length - 2} id={this.state.knob1}/>
        </div>
        <div className="double-knob">
          <Knob key={this.props.knobs.length - 1} id={this.state.knob2}/>
        </div>
      </div>
      ) : (
      <div className="knob-container">
        <div className="single-knob">
          <Knob key={this.props.knobs.length - 2} id={this.state.knob1}/>
        </div>
      </div>
    );
  }

  render() {

    const componentStyle = {
      fontSize: '1.2em',
      height: 'calc(100% - 4px)',
      width: '10em',
      border: '2px solid #383838',
      borderRadius: '2px',
      textAlign: 'center',
      backgroundColor: 'rgba(0,0,0,0.1)',
      margin: '2px 2px',
      float: 'left',
    };
    const effectNameStyle = {
      height: 'auto',
      width: '100%',
    };

    return (
      <div style={componentStyle}>
        <div className="effectName" style={effectNameStyle}>
          <i className="fa fa-minus-square-o" aria-hidden="true" style={{float: 'left', paddingLeft: '.02em'}} onClick={this.removeEffect}></i>
          {this.props.id.slice(0,this.props.id.length-2)}
        </div>
          {this.customKnobBuild.call(this)}
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
