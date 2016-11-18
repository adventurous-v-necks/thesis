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
    const style = {
      border: '2px solid #383838',
      borderRadius: '2px',
      backgroundColor: '#efefef',
      width: '100%',
      height: '100%',
      position: 'relative',
      paddingTop: '0.1em',
      top: '2px',
    }
    const synthVolume = {
      border: '2px solid DarkKhaki',
      position: 'absolute',
      height: '100px',
      top: '5%',
      width: '100px',
      right: '30%',
      textAlign: 'center',
    }

    return (
      <div style={{display:'inline-block', height:'36%', width:'100%', marginTop:'0.5em'}}>
        <div className="synth" style={style}>
          <Oscillators />
          {/* <Volume /> would like to be able to add eventually */}
          <div className="synth-volume" style={synthVolume}>
            <Knob id={6}/>
          </div>
          <Patch />
          <Keyboard />
        </div>
        <span style={{backgroundColor:'#efefef', marginTop: '-0.5em', position:'absolute', left:'1em', height:'1em', paddingLeft:'0.5em', paddingRight:'0.5em'}}>Synthesizer</span>
      </div>
    );
  }
}



const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Synth);
