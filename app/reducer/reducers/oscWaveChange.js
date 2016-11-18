import {hannWindow, linearInterpolation, pitchShifter} from '../../audioHelpers.js';
import {store} from '../../main.js';
import io from 'socket.io-client';
var socket = io.connect();

export default function(state, action) {
  switch (action.type) {
     case 'OSC_WAVE_CHANGE': {
      let temp = Object.assign([], state.performance);
      if (!action.synthetic) {
        socket.emit('event2server', { action: action });
        temp.push({action: action, timestamp: state.audioContext.currentTime});
      }

      let newOscs = Array.from(state.oscs);
      newOscs[action.oscnum] = action.wave;

      return Object.assign({}, state, {
        oscs: newOscs,
        performance: temp,
      });
    }

    return state;
  }

}