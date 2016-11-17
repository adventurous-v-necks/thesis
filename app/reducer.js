let events = 0;
let playTime = 0;

// set up our samples grid - 5x5 boxes
let COLUMNS = 5;
let SAMPLES_PER_COLUMN = 5;

import {hannWindow, linearInterpolation, pitchShifter} from './audioHelpers.js';

import {store} from './main.js';
import io from 'socket.io-client';

var socket = io.connect();

socket.on('event', function (data) {
  //UNCOMMENT HERE IF YOU WANT TO SEE WHAT IS BEING PROCESSED
  //console.log('data.data', data.data.action)
  store.dispatch(Object.assign(data.data.action, {synthetic: true}));
});

  // store.dispatch(Object.assign(nextEvent.action, {synthetic: true}));

  const sched = function() {
    let state = store.getState();
    let nextEvent = state.performance[events];
    if (!nextEvent) return;
    window.requestAnimationFrame(sched);
    var when = Math.abs(nextEvent.timestamp - state.timeZero);
    var delta = playTime + when;
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
      audioContext: null,
      nodes: [], // notes of the keyboard which are playing,
      knobs: [100,100,100,100,100,100], // array of objects for all the knobs in our app. knobs[0] is globalVolume, then the next 5 are the sampler columns
      timeZero: 0.045,
      recordTimeZero: false,
    };
  }

  switch (action.type) {
    case 'STORE_USER': {
      return Object.assign({}, state, {user: action.who});
    }
    case 'MARKER_UPDATE': {
      return Object.assign({}, state, {timeZero: state.audioContext.currentTime});
    }
    case 'AUDIO_RECORD': { // should start and restart (from pause) recording
      return Object.assign({}, state, {
        recording: true,
        recordTimeZero: state.audioContext.currentTime,
      }); // INCOMPLETE, override push to push and fire to socket.io
    }
    case 'PAUSE_RECORD': {
      return Object.assign({}, state, {
        performance: [],
        recording: false,
      }); // INCOMPLETE, override push to push and fire to socket.io
    }
    case 'AUDIO_STOP': {
      // Should stop recording audio and playing audio - perhaps prompt to share?
      // Current does the same as pausing the recording until we have a better use for it
      return Object.assign({}, state, {
        recording: false,
      }); //INCOMPLETE
    }
    case 'TIME_ZERO': {
      return Object.assign({}, state, {timeZero: state.audioContext.currentTime, performance: []});
    }
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
    case 'KEY_DOWN': {
      let oscillator = state.audioContext.createOscillator();
      oscillator.type = 'square';
      oscillator.frequency.value = action.frequency;

      oscillator.connect(state.synthGainNode);
      oscillator.start(0);
      let temp = Object.assign([], state.nodes);
      temp.push(oscillator);
      let temp2 = Object.assign([], state.performance);
      if (!action.synthetic) {
        socket.emit('event2server', { action: action });
        temp2.push({action: action, timestamp: state.audioContext.currentTime});
      }
      return Object.assign({}, state, {nodes: temp, performance: temp2});
    }
    case 'CREATE_AUDIO_CONTEXT': {
      let audioCtx = new AudioContext();
      let grainSize = 256;
      let pitchRatio = 1;
      let overlapRatio = 0.5;
      let pitchShiftNode = audioCtx.createScriptProcessor(grainSize, 1, 1);
      pitchShiftNode.buffer = new Float32Array(grainSize * 2);
      pitchShiftNode.grainWindow = hannWindow(grainSize);
      pitchShiftNode.onaudioprocess = pitchShifter.bind(pitchShiftNode, 1);

      let synthGainNode = audioCtx.createGain();
      synthGainNode.gain.value = 0.3;

      let gainNode = audioCtx.createGain();
      gainNode.gain.value = 1;
      synthGainNode.connect(gainNode);
      pitchShiftNode.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      return Object.assign({}, state, {audioContext: audioCtx, masterOut: gainNode, pitchShiftNode: pitchShiftNode, synthGainNode: synthGainNode});
    }
    case 'FADER_CHANGE': {
      // TODO: do something with the data e.g. adjust volume
      // replay the UI action (it wasn't necessarily caused by a UI change - could be synthetic)
      document.getElementById(action.id).value = action.value;
      let temp = Object.assign([], state.performance);
      if (!action.synthetic) {
        socket.emit('event2server', { action: action });
        temp.push({action: action, timestamp: state.audioContext.currentTime});
      }
      let bpm = Object.assign({}, state.BPM);
      if (action.id === 'tempoFader') {
        bpm = Math.round((action.value * (state.maxTempo - state.minTempo) / 100) + state.minTempo);
        var ratio = ((bpm+state.minTempo)/state.maxTempo).toFixed(2);
        state.pitchShiftNode.onaudioprocess = pitchShifter.bind(state.pitchShiftNode, ratio);
        for (var col of state.samples) {
          for (var sample of col) {
            if (sample.playing) {
              sample.source.playbackRate.value = ratio;
            }
          }
        }
      }
      return Object.assign({}, state, {BPM: bpm, performance: temp});
    }
    case 'PLAY': {
      events = 0;
      playTime = state.audioContext.currentTime;
      window.requestAnimationFrame(sched);
      return Object.assign({}, state);
    }
    case 'KNOB_TWIDDLE': {
      let temp = Object.assign([], state.performance);
      let temp2 = Object.assign([], state.knobs);
      temp2[action.id] = action.value;
      if (!action.synthetic) {
        temp.push({action: action, timestamp: state.audioContext.currentTime});
        socket.emit('event2server', { action: action });
      }
      if (action.id == '0') {
        state.masterOut.gain.value = action.value / 100;
      }
      return Object.assign({}, state, {performance: temp, knobs: temp2});
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
        theSample.source.connect(state.pitchShiftNode); //audioContext.destination
        theSample.source.start();
      } else {
        theSample.source.stop();
        theSample.source = null;
      }
      return Object.assign({}, state, {samples: allSamples});
    }
    case 'OSC_WAVE_CHANGE': {
      if (!action.synthetic) {
        socket.emit('event2server', { action: action });
      }
      let newOscs = Array.from(state.oscs);
      newOscs[action.num] = action.wave;
      return Object.assign({}, state, {oscs: newOscs});
    }
    default: {
      console.error('Reducer Error: ', action);
      return Object.assign({}, state);
    }
  }
};
