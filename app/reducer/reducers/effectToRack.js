import {hannWindow, linearInterpolation, pitchShifter} from '../../audioHelpers.js';
import {store} from '../../main.js';
import io from 'socket.io-client';
var socket = io.connect();

export default function(state, action) {
  switch (action.type) {
     case 'EFFECT_TO_RACK': {
      let effect = action.effect;
      let allActiveEffects = state.activeEffects.slice();
      let allKnobs = state.knobs.slice();

      if (state.activeEffects.indexOf(effect) === -1) {
        allActiveEffects.push(effect);
        allKnobs.push(100);
        allKnobs.push(100); // purposely repeated to account for two knob additions
      }
      return Object.assign({}, state, {activeEffects: allActiveEffects, knobs: allKnobs});
    }

    return state;
  }

}