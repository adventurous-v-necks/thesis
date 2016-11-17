import {hannWindow, linearInterpolation, pitchShifter} from '../../audioHelpers.js';
import {store} from '../../main.js';
import io from 'socket.io-client';
var socket = io.connect();

export default function(state, action) {
  switch (action.type) {
   case 'KEY_DOWN': {
    let oscillator = state.audioContext.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.value = action.frequency;

    oscillator.connect(state.synthGainNode);
    oscillator.start(0);
    let temp = Object.assign([], state.nodes);
    temp.push(oscillator);
    let temp2 = Object.assign([], state.performance);
    if (!action.synthetic) {
      socket.emit('event2server', { action: action });
      temp2.push({action: action, timestamp: state.audioContext.currentTime});
    }
    return Object.assign({}, state, {nodes: temp, performance: temp2});
  }
  
  return state;
}

}