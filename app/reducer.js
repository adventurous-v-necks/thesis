let events = 0;
let playTime = 0;

// set up our samples grid - 5x5 boxes
let COLUMNS = 5;
let SAMPLES_PER_COLUMN = 5;

import {store} from './main.js';
import io from 'socket.io-client';

 var socket = io.connect();
  socket.on('news', function (data) {
    console.log('news cs 13', data);
  });

  socket.on('faderChange2', function (data) {
      console.log('data after emitted from server data', data)
  });

const broadcast = function(action) { 
  // let state = store.getState();
  console.log('action', action)  
  timeNow()
// let nextEvent = state.performance[events];
  // store.dispatch(Object.assign(nextEvent.action, {synthetic: true}));
}

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
        column.push({sampleUrl: col < 3 ? '/samples/100bpm_Hamir_Kick.wav' : '/samples/100bpm_Hamir_Clap.wav',
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
      user: 'none',
      BPM: 120,
      minTempo: 60,
      maxTempo: 180,
      numColumns: COLUMNS,
      samples: samples,
      volume: 100
    };
  }

  switch (action.type) {
    case 'ADD_CLICK': {
      // clone the object! the state arg must not be mutated or your app will break
      return Object.assign({}, state, {clicks: state.clicks + 1});
    }
    case 'STORE_USER': {
      return Object.assign({}, state, {user: action.who});
    }
    case 'AUDIO_RECORD': {
      return Object.assign({}, state, {timeZero: state.audioContext.currentTime, performance: []}); //INCOMPLETE, override push to push and fire to socket.io
    }
    case 'AUDIO_STOP': {
      console.log('stop music');
      return Object.assign({}, state); //INCOMPLETE
    }
    case 'TIME_ZERO': {
      return Object.assign({}, state, {timeZero: state.audioContext.currentTime, performance: []});
    }
    case 'KEY_UP': {
      console.log('key up', action);
      return Object.assign({}, state,
        // {performance: state.performance.push({action, timestamp: Date.now() - state.timeZero})}
        );
    }
    case 'KEY_DOWN': {
      console.log('key down', action);
      return Object.assign({}, state,
        // {performance: state.performance.push({action, timestamp: Date.now() - state.timeZero})}
        );
    }
    case 'CREATE_AUDIO_CONTEXT': {
      return Object.assign({}, state, {audioContext: new AudioContext()});
    }
    case 'FADER_CHANGE': {
          socket.emit('my other event', { my: action });
          console.log('socket.emit called')
      // TODO: do something with the data e.g. adjust volume
      // replay the UI action (it wasn't necessarily caused by a UI change - could be synthetic)
      document.getElementById(action.id).value = action.value;
      let temp = Object.assign([], state.performance);
      if (!action.synthetic) {
        temp.push({action: action, timestamp: state.audioContext.currentTime});
      }
      let bpm = Object.assign({}, state.BPM);
      if (action.id === 'tempoFader') {
        bpm = Math.round((action.value * (state.maxTempo - state.minTempo) / 100) + state.minTempo);
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
      console.log('the', io)
      let temp = Object.assign([], state.performance);
      if (!action.synthetic) {
        temp.push({action: action, timestamp: state.audioContext.currentTime});
      }
      return Object.assign({}, state, {volume: action.volume, performance: temp});
    }
    case 'PLAY_SAMPLE': {
      let allSamples = state.samples.slice(); //clone to avoid mutation
      let theSample = allSamples[action.sample.column][action.sample.index]; //find relevant sample
      theSample.playing = !theSample.playing;
      if (theSample.playing) {
        theSample.source = state.audioContext.createBufferSource();
        //var g = audioContext.createGain();
        theSample.source.loop = true;
        theSample.source.buffer = action.buffer;
        theSample.source.connect(state.audioContext.destination);
        theSample.source.start();
      } else {
        console.log('stopping');
        theSample.source.stop();
        theSample.source = null;
      }
      return Object.assign({}, state, {samples: allSamples});
    }
    default: {
      console.error('Reducer Error: ', action);
      return Object.assign({}, state);
    }
  }
};
