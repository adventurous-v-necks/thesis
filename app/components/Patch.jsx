import React from 'react';
import styles from '../App.scss';
import {connect} from 'react-redux';

class Patch extends React.Component {
  constructor(props) {
    super(props);
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
          <select size={1} style={selectStyle}>
            <option value="1">CrazyTime Piano</option>
            <option value="2">Pirate-y Tones</option>
            <option value="3">Dungeon Synth</option>
            <option value="4">HR Happytime</option>
          </select>
        </div>
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Patch);

