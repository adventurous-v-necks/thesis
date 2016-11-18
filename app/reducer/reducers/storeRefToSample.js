import {hannWindow, linearInterpolation, pitchShifter} from '../../audioHelpers.js';
import {store} from '../../main.js';
import io from 'socket.io-client';
var socket = io.connect();

export default function(state, action) {
  switch (action.type) {
    case 'STORE_REF_TO_SAMPLE': {
      // so the actual buffer itself is being stored locally on the Sample component,
      // turns out we'll need to grab a reference to it in this reducer, so keep an array of them.
      let temp = Object.assign([], state.sampleBuffers || []);
      temp.push([action.col, action.idx, action.buffer]);
      return Object.assign({}, state, {sampleBuffers: temp});
    }

    return state;
  }

}