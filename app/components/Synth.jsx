import React from 'react';
import styles from '../App.scss';
import {connect} from 'react-redux';
import Keyboard from './Keyboard.jsx';
import Patch from './Patch.jsx';
import Knob from './Knob.jsx';
import Oscillators from './Oscillators.jsx';

class Synth extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const synthStyle = {
      border: '2px solid #383838',
      borderRadius: '2px',
      backgroundColor: '#efefef',
      width: '100%',
      height: '100%',
      position: 'relative',
      paddingTop: '0.1em',
      top: '2px',
    }
    const synthVolumeStyle = {
      border: '2px solid #383838',
      position: 'absolute',
      height: '32%',
      top: '5%',
      width: '100px',
      right: '30%',
      textAlign: 'center',
    }

    const labelStyle = {
      backgroundColor:'#efefef',
      marginTop: '-0.5em',
      position:'absolute',
      left:'1em',
      height:'1em',
      paddingLeft:'0.5em',
      paddingRight:'0.5em',
      fontSize:'20px',
    }

    return (
      <div style={{display:'inline-block', height:'36%', width:'100%', marginTop:'0.5em'}}>
        <div className="synth" style={synthStyle}>
          <Oscillators />
          <div className="synthVolume" style={synthVolumeStyle}>
            <Knob style={{position: 'relative', top: '20%'}} id={6}/>
            <span style={{position: 'relative', top: '15%', backgroundColor: '#efefef', width: '4em'}}>Volume</span>
          </div>
          <Patch />
          <Keyboard />
        </div>
        <span style={labelStyle}>Synthesizer</span>
      </div>
    );
  }
}



const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Synth);
