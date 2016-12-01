import React from 'react';
import styles from '../App.scss';
import {connect} from 'react-redux';

class Patch extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const patches = {
      // patch_value: [wave1, wave2, vol1, vol2, detune1, detune2]
      sine: ['sine', 'sine', 100, 100, 127, 127],
      square: ['square', 'square', 100, 100, 127, 127],
      sawtooth: ['sawtooth', 'sawtooth', 100, 100, 127, 127],
      snake: ['square', 'sawtooth', 100, 60, 127, 140],
      spooky: ['sine', 'square', 100, 20, 0, 255],
    };

    this.props.dispatch({
      type: 'PATCH_CHANGE', 
      patchName: event.target.value,
      patch: patches[event.target.value],
    });
  }

  render() {
    const style = {
      top: '10%',
      height: '25%',
      width: '20%',
      border: '2px solid #383838',
      // float: 'right',
      position: 'absolute',
      right: '3%',
    }

    const selectStyle = {
      fontSize: '111%',
      position: 'relative',
      bottom: '28%',
      left: '3%',
    }

    const labelStyle = {
      backgroundColor: '#efefef',
      marginTop: '-0.5em',
      position: 'relative',
      clear: 'both',
      top: '-0.8em',
      left:'0.3em',
      height:'1em',
      paddingLeft:'0.5em',
      paddingRight:'0.5em',
    }

    return (
      <div className="patch">
        <div style={style}>
        <span style={labelStyle}>Patch</span>
        <select size={1} style={selectStyle} 
          value={this.props.patch} onChange={this.handleChange}>
            <option value="sine">Constant Waves</option>
            <option value="square">Harsh Waves</option>
            <option value="sawtooth">Sawtooth</option>
            <option value="snake">Snake Charmer</option>
            <option value="spooky">Spooky</option>
          </select>
        </div>
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {
    patch: state.patch,
  };
}

export default connect(mapStateToProps)(Patch);

