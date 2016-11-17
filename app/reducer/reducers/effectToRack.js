import {hannWindow, linearInterpolation, pitchShifter} from '../../audioHelpers.js';
import {store} from '../../main.js';
import io from 'socket.io-client';
var socket = io.connect();

export default function(state, action) {
  switch (action.type) {
     case 'EFFECT_TO_RACK': {
      let effect = action.effect;
      let allActiveEffects = state.activeEffects.slice();

      if (state.activeEffects.indexOf(effect) === -1) {
        allActiveEffects.push(effect);
      }
      return Object.assign({}, state, {activeEffects: allActiveEffects});
    }

    return state;
  }

}