//-----------------------
import React from 'react';
import styles from '../App.scss';
import Knob from './Knob.jsx';

import {connect} from 'react-redux';

class EffectUnit_Distortion extends React.Component {
  // We should avoid local component state, except where we don't
  state = {};

  constructor(props) {
    super(props);
    this.removeEffect = this.removeEffect.bind(this);
  }
  componentDidMount() {
    console.log('distortion props: ', this.props);
    this.setState({
      knob: this.props.knobs.length - 1,
    });
  }
  removeEffect(e) {
    this.props.dispatch({type: 'EFFECT_FROM_RACK', id: this.props.id});
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
    };
    const knobContainerStyle = {
      heigth: 'auto',
      width: '100%',
      transform: 'translateY(15%)',
    };
    const knobStyle = {
      height: 'auto',
      width: '100%',
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
            <Knob key={this.props.knobs.length - 1} id={this.state.knob}/>
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

export default connect(mapStateToProps)(EffectUnit_Distortion);
