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
      knob1: this.props.knobs.length - 4,
      knob2: this.props.knobs.length - 3, 
      knob3: this.props.knobs.length - 2,
      knob4: this.props.knobs.length - 1,
      knob5: this.props.knobs.length - 5,
      knob6: this.props.knobs.length - 6
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
      width: 'auto',
    };
    const knobStyle = {
      height: 'auto',
      width: '45%',
      textAlign: 'center',
    };

if (this.props.id.slice(0, 15) === "BiquadFilterMid"){
    return (
      <div style={componentStyle}>
        <div className="effectName" style={effectNameStyle}>
          <i className="fa fa-minus-square-o" aria-hidden="true" style={{float: 'left', paddingLeft: '.02em'}} onClick={this.removeEffect}></i>
          {this.props.id}
        </div>
        <div className="knobContainer" style={knobContainerStyle}>
          <div style={knobStyle}>
            <Knob key={this.props.knobs.length - 4} id={this.state.knob1}/>
              <span style={{position: 'relative', top: '5%', backgroundColor: '#efefef', width: '4em'}}>BQF1</span>
          </div>
          <div style={knobStyle}>
            <Knob key={this.props.knobs.length - 3} id={this.state.knob2}/>
              <span style={{position: 'relative', top: '5%', backgroundColor: '#efefef', width: '4em'}}>BQF2</span>
          </div>
          <div style={knobStyle}>
            <Knob key={this.props.knobs.length - 2} id={this.state.knob3}/>
            <span style={{position: 'relative', top: '5%', backgroundColor: '#efefef', width: '4em'}}>BQF3</span>
          </div>
          <div style={knobStyle}>
            <Knob key={this.props.knobs.length - 1} id={this.state.knob4}/>
            <span style={{position: 'relative', top: '5%', backgroundColor: '#efefef', width: '4em'}}>BQF4</span>
          </div>
        </div>
      </div>
    );
   }
   else {
    return (
      <div style={componentStyle}>
        <div className="effectName" style={effectNameStyle}>
          <i className="fa fa-minus-square-o" aria-hidden="true" style={{float: 'left', paddingLeft: '.02em'}} onClick={this.removeEffect}></i>
          {this.props.id}
        </div>
        <div className="knobContainer" style={knobContainerStyle}>
          <div style={knobStyle}>
            <Knob key={this.props.knobs.length - 5} id={this.state.knob5}/>
              <span style={{position: 'relative', top: '5%', backgroundColor: '#efefef', width: '4em'}}>Vol 1</span>
          </div>
          <div style={knobStyle}>
            <Knob key={this.props.knobs.length - 6} id={this.state.knob6}/>
              <span style={{position: 'relative', top: '5%', backgroundColor: '#efefef', width: '4em'}}>Vol 2</span>
          </div>
        </div>
      </div>
    );
   }
  }
}

const mapStateToProps = function(state) {
  return {
    knobs: state.knobs,
  };
}

export default connect(mapStateToProps)(EffectsUnit);
