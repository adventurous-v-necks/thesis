import React from 'react';
import styles from '../App.scss';
import TimeSig from './TimeSig.jsx';
import Tempo from './Tempo.jsx';
import Marker from './Marker.jsx';
import Controls from './Controls.jsx';
import Knob from './Knob.jsx';

import {connect} from 'react-redux';

import {store} from '../main.js';

class Transport extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    fetch('/savedSets', {credentials: 'include'}).then(resp => resp.json()).then(sets => {
      this.props.dispatch({type:'GOT_SAVED_SETS', sets: sets});
    });
  }
  syncToggle() {
    this.props.dispatch({type:'SYNC_TOGGLE'});
  }
  setList(e) {
    // TODO: We're loading all the sets at once -- load names only, then load set when user clicks on it
    let set = this.props.sets[e.target.value];
    this.props.dispatch({type:'LOAD_SET', set: set.state});
  }
  saveSet() {
    let state = Object.assign({}, store.getState());
    delete state.state.audioContext;
    delete state.user.currentRoom;
    delete state.state.lastPlayed;
    delete state.user.loggedIn;
    delete state.state.markerTime;
    delete state.state.masterOut; delete state.state.customEffects;
    delete state.state.midi; delete state.state.activeRooms;
    delete state.state.effectsMenuActive; delete state.state.midiOutput;
    delete state.state.nodes; delete state.state.oscGainNodes;
    delete state.state.midiDevices;
    delete state.state.pitchShiftNode;
    delete state.state.playing; delete state.state.recording;
    delete state.state.sampleBuffers; delete state.state.savedSets;
    delete state.state.socket; delete state.state.synthGainNode;
    delete state.user.user;
    state.name = new Date().toLocaleString();
    let theHeaders = new Headers({ "Content-Type":"application/json" });
    let stringyState = JSON.stringify({state: state});
    fetch('/saveState', {credentials:'include',method:'POST', headers: theHeaders, body: stringyState}).then(resp => {
      resp.json().then(r => {
        alert('Your set was saved.');
      });
    });
  }

  render() {
    const volumeSizing = {
      width: 'auto',
      float: 'right',
      height: 'auto',
      textAlign: 'center',
      position: 'relative',
      top: '0.6em',
    };
    let syncStyle = {
      width:'auto',
      height:'auto',
      backgroundColor: this.props.syncOn ? 'red' : '#efefef',
      border: '1px solid black',
      cursor: 'pointer',
      padding: '0.3em 0.6em',
      position: 'relative',
      top: '-0.72em',
    };
    let setDropdownStyle = {
      color: 'black',
      left: '5em',
      position: 'relative',
      padding: '0 1em',
      border: '1px solid black',
      height: '2em',
      top: '50%',
      transform: 'translateY(-50%)',
    };
    let cloudStyle = {
      position: 'relative',
      left: '2em',
      fontSize: '2em',
      top: '50%',
      transform: 'translateY(-50%)',
      float: 'left',
    };
    console.log('transport, sets is',this.props.sets);
    return (
      <span style={{display:'inline-block', height:'auto', width:'100%', marginTop:'0.2em'}}>
        <div className="transportContainer">
          <TimeSig />
          <Tempo />
          <span style={syncStyle} onClick={this.syncToggle.bind(this)}>SYNC</span>
          <Marker />
          <Controls />
          <div className="saver">
            <i onClick={this.saveSet.bind(this)} style={cloudStyle} title="Save current set" className="fa fa-cloud-upload"></i>
            <select name="set-select" style={setDropdownStyle} onChange={this.setList.bind(this)}>
            <option value="-1">Load a Saved Set</option>
            {this.props.sets.map((set,i) => (
              <option key={'set'+i} value={i}>{set.state.name}</option>
            ))}
          </select></div>
          <span style={volumeSizing}>
            <Knob id="0" title="Adjust Volume" label='Master'/>
          </span>
        </div>
        <span style={{backgroundColor:'#efefef', marginTop: '-0.5em', position:'absolute', left:'1em', height:'1em', paddingLeft:'0.5em', paddingRight:'0.5em'}}>Transport Controls</span>
      </span>
    );
  }
}


const mapStateToProps = function(state) {
  return {
    syncOn : state.state.syncOn,
    sets: state.state.savedSets,
  };
}

export default connect(mapStateToProps)(Transport);
