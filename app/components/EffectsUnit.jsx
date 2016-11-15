import React from 'react';
import styles from '../App.scss';
import Knob from './Knob.jsx';

import {connect} from 'react-redux';

class EffectsDropDown extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  render() {

    const componentStyle = {
      fontSize: '2em',
      height: '100%',
      width: '25%',
      border: '1px solid black',
      float: 'left',
    };
    const effectNameStyle = {
      height: 'auto',
      width: '100%',
      border: '1px solid blue',
    };
    const knobContainerStyle = {
      heigth: 'auto',
      width: '50%',
      border: '1px solid green',
    };

    return (
      <div style={componentStyle}>
        <div className="effectName" style={effectNameStyle}>
          {this.props.id}
        </div>
        <div className="knobContainer" style={knobContainerStyle}>
          <Knob />
          <Knob />
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(EffectsDropDown);
