import {hannWindow, linearInterpolation, pitchShifter} from '../../audioHelpers.js';
import {store} from '../../main.js';
import io from 'socket.io-client';
var socket = io.connect();

export default function(state, action) {
  switch (action.type) {
   case 'KNOB_TWIDDLE': {
    let temp = Object.assign([], state.performance);
    let temp2 = Object.assign([], state.knobs);
    temp2[action.id] = action.value;
    if (!action.synthetic) {
      temp.push({action: action, timestamp: state.audioContext.currentTime});
      socket.emit('event2server', { action: action });
    }
    if (action.id == '0') {
      state.masterOut.gain.value = action.value / 100;
    }
      if (action.id >= 1 && action.id <=4) { // one of the column volume knobs
        for (var sample of state.samples[action.id-1]) {
          if (sample.playing) sample.gainNode.gain.value = action.value / 100;
        }
      }
      return Object.assign({}, state, {performance: temp, knobs: temp2});
    }
    
    return state;
  }

}