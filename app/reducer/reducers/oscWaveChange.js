import {hannWindow, linearInterpolation, pitchShifter} from '../../audioHelpers.js';
import {store} from '../../main.js';
import io from 'socket.io-client';
var socket = io.connect();

export default function(state, action) {
  switch (action.type) {
     case 'OSC_WAVE_CHANGE': {
      if (!action.synthetic) {
        socket.emit('event2server', { action: action });
      }
      let newOscs = Array.from(state.oscs);
      newOscs[action.num] = action.wave;
      return Object.assign({}, state, {oscs: newOscs});
    }

    return state;
  }

}