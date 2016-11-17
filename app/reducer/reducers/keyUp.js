import {hannWindow, linearInterpolation, pitchShifter} from '../../audioHelpers.js';
import {store} from '../../main.js';
import io from 'socket.io-client';
var socket = io.connect();

export default function(state, action) {
  switch (action.type) {
   case 'KEY_UP': {
      // TODO: optimize this -- use a hash table instead of an array
      let new_nodes = [];
      for (let i = 0; i < state.nodes.length; i++) {
        if (Math.round(state.nodes[i].frequency.value) === Math.round(action.frequency)) {
          state.nodes[i].stop(0);
          state.nodes[i].disconnect();
        } else {
          new_nodes.push(nodes[i]);
        }
      }
      let temp = Object.assign([], state.performance);
      if (!action.synthetic) {
        socket.emit('event2server', { action: action });
        temp.push({action: action, timestamp: state.audioContext.currentTime});
      }
      return Object.assign({}, state, {nodes: new_nodes, performance: temp});
    }

    return state;
  }

}