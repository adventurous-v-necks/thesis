let events = 0;
let playTime = 0;

// set up our samples grid - 5x5 boxes
let COLUMNS = 5;
let SAMPLES_PER_COLUMN = 5;

import {hannWindow, linearInterpolation, pitchShifter} from '../audioHelpers.js';
import reducers from './combined.js'
import {store} from '../main.js';
import io from 'socket.io-client';
var socket = io.connect();

socket.on('event', function (data) {
  store.dispatch(Object.assign(data.data.action, {synthetic: true}));
});

const sched = function() {
  let state = store.getState();
  let nextEvent = state.performance[events];
  if (!nextEvent) return;
  window.requestAnimationFrame(sched);
  var when = Math.abs(nextEvent.timestamp - state.timeZero);
  var delta = playTime + when;
  store.dispatch({type:'MARKER_UPDATE'});
  if (state.audioContext.currentTime - delta >= 0) {
    // trigger the event
    store.dispatch(Object.assign(nextEvent.action, {synthetic: true}));
    events++;
  }
};

export default function reduce(state, action) {
  if (state === undefined) {
    let samples = [];
    for (var col = 0; col < COLUMNS; col++) {
      var column = [];
      for (var sample = 0; sample < SAMPLES_PER_COLUMN; sample++) {
        column.push({sampleUrl: col < 3 ? '/samples/Mix_Hamir.wav' : '/samples/100bpm_Hamir_Clap.wav',
          index: sample,
          column: col,
          sampleName: 'Drum Loop '+col+sample,
          playing: false,
          loaded: false,
          buffer: null
        });
      }
      samples.push(column);
    }
    return {
      performance: [],
      recording: false,
      playing: false,
      user: 'none',
      BPM: 120,
      minTempo: 60,
      maxTempo: 180,
      numColumns: COLUMNS,
      samples: samples,
      oscs: [0, '1', '1'],
      masterOut: null, // if you're making stuff that makes noise, connect it to this
      audioContext: null, // first set when page loads
      nodes: [], // notes of the keyboard which are playing,
      knobs: [100,100,100,100,100,100], // array of objects for all the knobs in our app. knobs[0] is globalVolume, then the next 5 are the sampler columns
      timeZero: 0, 
      suspended: false,
      markerTime: 0,
      recordStartTime: false,
      effectsMenuActive: false,
      customEffects: ['lorem', 'fx', 'sfx', 'ipsum'],
      activeEffects: [],
      suspended: false
    };
  }

  switch (action.type) {
    case 'STORE_USER': {
      return reducers.storeUser(state, action)
    }
    case 'MARKER_UPDATE': {
      return reducers.markerUpdate(state, action)
    }
    case 'AUDIO_RECORD': { // should start and restart (from pause) recording
      return reducers.audioRecord(state, action)
    }
    case 'AUDIO_STOP': {
      return reducers.audioStop(state, action)
    }
    case 'KEY_UP': {
      // TODO: optimize this -- use a hash table instead of an array
      return reducers.keyUp(state, action)
    }
    case 'KEY_DOWN': {
      return reducers.keyDown(state, action)
    }
    case 'CREATE_AUDIO_CONTEXT': {
        return reducers.createAudioCxt(state, action)      
    }
    case 'FADER_CHANGE': {
      return reducers.faderChange(state, action)
    }
    case 'PLAY': {
      events = 0;
      playTime = state.audioContext.currentTime;
      window.requestAnimationFrame(sched);
      return Object.assign({}, state, {
        recording: false,
        recordStartTime: state.audioContext.currentTime,
      });
    }
    case 'KNOB_TWIDDLE': {
      return reducers.knobTwiddle(state, action)
    }
    case 'PLAY_SAMPLE': {
      if (!action.synthetic) {
        socket.emit('event2server', { action: action });
      }
      let allSamples = Object.assign([], state.samples); //clone to avoid mutation
      let theSample = allSamples[action.sample.column][action.sample.index]; //find relevant sample
      theSample.playing = !theSample.playing;
      if (theSample.playing) {
        theSample.source = state.audioContext.createBufferSource();
        theSample.source.loop = true;
        theSample.source.buffer = action.buffer;

        let gainNode = state.audioContext.createGain();
        gainNode.gain.value = state.knobs[action.sample.column+1]/100;
        theSample.source.connect(gainNode);
        theSample.gainNode = gainNode;

        gainNode.connect(state.pitchShiftNode);
        theSample.source.start();
      } else {
        theSample.source.stop();
        theSample.source = null;
      }
      return Object.assign({}, state, {samples: allSamples});
    }
    case 'OSC_WAVE_CHANGE': {
      return reducers.oscWaveChange(state, action)
    }
    case 'EFFECT_MENU_TOGGLE': {
      return reducers.effectMenuToggle(state, action);
    }
    case 'EFFECT_TO_RACK': {
      return reducers.effectToRack(state, action);
    }
    case 'EFFECT_FROM_RACK': {
      return reducers.effectFromRack(sate, action);
    }
    default: {
      console.error('Reducer Error: ', action);
      return Object.assign({}, state);
    }
  }
};
