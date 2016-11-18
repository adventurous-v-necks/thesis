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
      if (action.id == '0') { //globalVolume
        state.masterOut.gain.value = action.value / 100;
      }
      if (action.id >= 1 && action.id <= 5) { // one of the sampler column volume knobs
        for (let sample of state.samples[action.id-1]) {
          if (sample.playing) sample.gainNode.gain.value = action.value / 100;
        }
      }
      if (action.id == '6') { //synthVolum
      }
      if (action.id >= 7 && action.id <= 12) { // one of the oscillator knobs
      }
      if (action.id >=13 && action.id <= 20) { // reserved for additional features
      }
      if (action.id > 20) { // one of the effect knobs
      }
      return Object.assign({}, state, {performance: temp, knobs: temp2});
    }
    
    return state;
  }

}