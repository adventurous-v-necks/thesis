import {hannWindow, linearInterpolation, pitchShifter} from '../../audioHelpers.js';
import {store} from '../../main.js';
import io from 'socket.io-client';
var socket = io.connect();

export default function(state, action) {
  switch (action.type) {
     case 'EFFECT_FROM_RACK': {
      let allActiveEffects = state.activeEffects.slice();
      allActiveEffects = allActiveEffects.filter((effect) => effect !== action.effect.id);

      return Object.assign({}, state, {activeEffects: allActiveEffects});
    }

    return state;
  }

}