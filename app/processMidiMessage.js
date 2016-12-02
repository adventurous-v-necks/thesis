import {store} from './main.js';

export const processMidiMessage = function(evt) {
  //console.log(evt, evt.data[0] & 0xf0);
  var data = evt.data;
  //var cmd = data[0] >> 4;
  //var channel = data[0] & 0xf;
  var type = data[0] & 0xf0;
  var note = data[1];
  var velocity = data[2];
  switch(type) {
    case 144: //note on
      // TODO: we can get velocity from the midi keyboard - dispatch that, too,
      // and have the synth act on it.
      if (note <= 36) {
        store.dispatch({type:'PLAY_SAMPLE', buffer: {}, sample: {index: (32 - (note - (note%8)))/8, column: note % 8}});
      }
      if (note >= 48 && note <= 72) {
        store.dispatch({type:'KEY_DOWN', frequency: Math.pow(2, (note-69)/12).toFixed(3)*440});
      }
      break;
    case 128:
      // note off
      if (note >= 48 && note <= 72) {
        store.dispatch({type:'KEY_UP', frequency: Math.pow(2, (note-69)/12).toFixed(3)*440});
      }
      break;
    case 176:
      switch(note) {
        case 48:
          // this is the first knob on the APC Key 25
          break;
      }
      break;
    default:
      break;
  }
}
