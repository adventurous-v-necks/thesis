import storeUser from './reducers/storeUser.js';
import faderChange from './reducers/faderChange.js';
import markerUpdate from './reducers/markerUpdate.js';
import audioRecord from './reducers/audioRecord.js';
import audioStop from './reducers/audioStop.js';
import keyUp from './reducers/keyUp.js';
import keyDown from './reducers/keyDown.js';
import createAudioCxt from './reducers/createAudioCxt.js';
import knobTwiddle from './reducers/knobTwiddle.js';
import oscWaveChange from './reducers/oscWaveChange.js';
import effectMenuToggle from './reducers/effectMenuToggle.js';
import effectToRack from './reducers/effectToRack.js';
import effectFromRack from './reducers/effectFromRack.js'

const combined = {
  storeUser: storeUser,
  faderChange: faderChange,
  markerUpdate: markerUpdate,
  audioRecord: audioRecord,
  audioStop: audioStop,
  keyUp: keyUp,
  keyDown: keyDown,
  createAudioCxt: createAudioCxt,
  knobTwiddle: knobTwiddle,
  oscWaveChange: oscWaveChange,
  effectMenuToggle: effectMenuToggle,
  effectToRack: effectToRack,
  effectFromRack: effectFromRack
};

export default combined;