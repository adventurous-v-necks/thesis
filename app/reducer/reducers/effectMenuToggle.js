import {hannWindow, linearInterpolation, pitchShifter} from '../../audioHelpers.js';
import {store} from '../../main.js';
import io from 'socket.io-client';
var socket = io.connect();

export default function(state, action) {
  switch (action.type) {
     case 'EFFECT_MENU_TOGGLE': {
      return Object.assign({}, state, {effectsMenuActive: !state.effectsMenuActive});
    }

    return state;
  }

}