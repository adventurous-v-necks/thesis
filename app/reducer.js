// "maybe just add a line of whitespace"

let events = 0;
let playTime = 0;

// set up our samples grid - 5x5 boxes
let COLUMNS = 5;
let SAMPLES_PER_COLUMN = 5;

import {hannWindow, linearInterpolation, pitchShifter} from './audioHelpers.js';

import {BiquadFilter, BiquadFilterLo, BiquadFilterMid, BiquadFilterHi, MOOGFilter, Distortion, makeDistortionCurve} from './effects.js';
import {processMidiMessage} from './processMidiMessage.js';

import {store} from './main.js';

// DEPLOY: comment the following line out to deploy
import IO from 'socket.io-client';

const sched = function() {
  let state = store.getState();
  let nextEvent = state.performance[events];
  if (!nextEvent) { return; }
  window.requestAnimationFrame(sched);
  let when = Math.abs(nextEvent.timestamp - state.recordStartTime);
  let delta = playTime + when;
  store.dispatch({type: 'MARKER_UPDATE'});
  if (state.audioContext.currentTime - delta >= 0) {
    // trigger the event
    store.dispatch(Object.assign(nextEvent.action, {synthetic: true}));
    events++;
  }
};

const sampleUrls = [
  '/samples/100bpm_Hamir_Bass_1.wav.mp3',
  '/samples/100bpm_Hamir_Bass_2.wav.mp3',
  '/samples/100bpm_Hamir_Clap.mp3',
  '/samples/100bpm_Hamir_Drop_1.wav.mp3',
  '/samples/100bpm_Hamir_Drop_2.wav.mp3',
  '/samples/100bpm_Hamir_DrumLoop_01.wav.mp3',
  '/samples/100bpm_Hamir_DrumLoop_02.wav.mp3',
  '/samples/100bpm_Hamir_DrumLoop_(No_kick)_01.wav.mp3',
  '/samples/100bpm_Hamir_Fx_Noise.wav.mp3',
  '/samples/100bpm_Hamir_Fx_Riseup.wav.mp3',
  '/samples/100bpm_Hamir_Hithat.wav.mp3',
  '/samples/100bpm_Hamir_Perc.wav.mp3',
  '/samples/100bpm_Hamir_Ride_1.wav.mp3',
  '/samples/100bpm_Hamir_Ride_2.wav.mp3',
  '/samples/100bpm_Hamir_Snare.wav.mp3',
  '/samples/100bpm_Hamir_Kick.mp3',
  '/samples/100bpm_Hamir_Sub.wav.mp3',
  '/samples/100bpm_Hamir_Synth_1.wav.mp3',
  '/samples/100bpm_Hamir_Synth_2.wav.mp3'
];

const fetchRooms = () => {
  let theHeaders = new Headers({ "Content-Type": "application/json" });
  fetch('/liveRooms', {credentials: 'include', method: 'GET', headers: theHeaders}).then(resp => {
    resp.json().then(r => {
      if (r.status === 'ok') {
        store.dispatch({type: 'UPDATE_ACTIVE_ROOMS', allActiveRooms: r.rooms})
      }
    });
  });
};

export default function reduce(state, action) {
  if (state === undefined) {
    let samples = [];
    for (let col = 0; col < COLUMNS; col++) {
      let column = [];
      for (let sample = 0; sample < SAMPLES_PER_COLUMN; sample++) {
        column.push({sampleUrl: sampleUrls[(col * 5 + sample) % 18],
          index: sample,
          column: col,
          sampleName: sampleUrls[(col * 5 + sample) % 18].split('/')[2].split('_')[2].split('.')[0],
          playing: false,
          loaded: false,
          buffer: null
        });
      }
      samples.push(column);
    }
    return {
      loggedIn: !!window.localStorage.getItem('com.rejuicy.user'),
      performance: [],
      recording: false,
      playing: false,
      user: 'none',
      BPM: 120,
      minTempo: 60,
      maxTempo: 180,
      numColumns: COLUMNS,
      samples: samples,
      oscwaves: [null, 'sine', 'sine'],
      patch: 'sine',
      masterOut: null, // if you're making stuff that makes noise, connect it to this
      audioContext: null, // first set when page loads
      keys: {'0': {}, '1': {}}, // notes of the keyboard which are playing,
      /*
      array of values for all knobs in our app.
      knobs[0] is reserved for globalVolume
      knobs[1-5] are reserved for individual sampler columns
      knobs[6] is reserved for synthVolume
      knobs[7-12] are reserved for oscillator volumes and detuners
      knobs[13-20] are reserved for additional features
      knobs[20+] are reserved for effects
      */
      knobs: [
        100, 100, 100, 100, 100,
        100, 100, 100, 100, 127,
        127, 100, 100, 100, 100,
        100, 100, 100, 100, 100,
        100, 100,
      ],
      timeZero: 0,
      suspended: false,
      markerTime: 0,
      recordStartTime: 0,
      effectsMenuActive: false,
      suspended: false,
      recordTimeZero: false,
      customEffects: [
        {
          name: 'MOOG',
          node: MOOGFilter,
        },
        {
          name: 'BiquadFilterLo',
          node: BiquadFilterLo,
        },
        {
          name: 'BiquadFilterMid',
          node: BiquadFilterMid,
        },
        {
          name: 'BiquadFilterHi',
          node: BiquadFilterHi,
        },
        {
          name: 'Distortion',
          node: Distortion,
        },
        ],
      activeEffects: [],
      syncOn: true,
      lastPlayed: 0, // time (audio time) the last sample was played
      activeRooms: [],
      currentRoom: '',
      midi: null, // the midi object as a whole, if we got one
      midiDevices: [],
      midiDevice: 0, // an integer selection 0-n from the midi outputs available on midi object
      midiOutput: null, // the actual midi output object to send messages on
      savedSets: [],
      faders: {}, // each fader - global BPM then column BPM
    };
  }

  switch (action.type) {
    case 'USER_LOGIN': {
      let newUserRoom = JSON.parse(window.localStorage.getItem('com.rejuicy.user')).username;
      state.socket.emit('room', { joinRoom: newUserRoom});
      fetchRooms();
      return Object.assign({}, state, {loggedIn: true, currentRoom: newUserRoom});
    }
    case 'USER_LOGOUT': {
      return Object.assign({}, state, {loggedIn: false});
    }
    case 'GOT_SAVED_SETS': {
      return Object.assign({}, state, {savedSets: action.sets.sets});
    }
    case 'LOAD_SET': {
      let set = action.set;
      for (let fader of Object.keys(set.faders)) {
        document.getElementById(fader).value = Number(set.faders[fader]);
      }
      return Object.assign({}, state, {
        BPM: set.BPM,
        activeEffects: set.activeEffects,
        maxTempo: set.maxTempo,
        minTempo: set.minTempo,
        knobs: set.knobs,
        performance: set.performance,
        patch: set.patch,
        numColumns: set.numColumns,
        recordStartTime: set.recordStartTime,
        recordTimeZero: set.recordTimeZero,
        timeZero: set.timeZero,
        samples: set.samples,
        syncOn: state.syncOn,
        faders: state.faders,
      });
    }
    case 'MARKER_UPDATE': {
      return Object.assign({}, state, {markerTime: state.audioContext.currentTime - state.recordStartTime});
    }
    case 'AUDIO_RECORD': { // should start and restart (from pause) recording
      if (!state.recording) {
        return Object.assign({}, state, {
          recording: true,
          recordStartTime: state.audioContext.currentTime,
          performance: [],
        });
      } else {
        return Object.assign({}, state, {
          recording: false,
        });
      }
    }
    case 'AUDIO_STOP': {
      if (!state.suspended) {
        state.audioContext.suspend();
        return Object.assign({}, state, {suspended: true, recording: false});
      } else {
        state.audioContext.resume();
        return Object.assign({}, state, {suspended: false, recording: false});
      }
    }
    case 'KEY_UP': {
      let tempKeys;
      let tempPerf = [...state.performance];

      for (let oscNum = 0; oscNum < 2; oscNum++) {
        let ind = Math.round(action.frequency).toString();
        state.keys[oscNum][ind].stop(0);
        state.keys[oscNum][ind].disconnect();
      }

      tempKeys = { ...state.keys };

      if (!action.synthetic) {
        state.socket.emit('event2server', { action: action, room: state.currentRoom });
        tempPerf.push({action: action, timestamp: state.audioContext.currentTime});
      }

      return { ...state, keys: tempKeys, performance: tempPerf };
    }
    case 'KEY_DOWN': {
      let tempKeys = { ...state.keys };
      let tempPerf = [...state.performance];

      for (let oscNum = 0; oscNum < 2; oscNum++) {
        let oscillator = state.audioContext.createOscillator();
        let ind = Math.round(action.frequency).toString();

        oscillator.type = state.oscwaves[oscNum + 1];
        oscillator.frequency.value = action.frequency;
        oscillator.detune.value = (state.knobs[oscNum + 9] - 127.5) * (200 / 255);

        oscillator.connect(state.oscGainNodes[oscNum]);
        oscillator.start(0);

        tempKeys[oscNum][ind] = oscillator;

        if (!action.synthetic) {
          state.socket.emit('event2server', { action: action, room: state.currentRoom });
          tempPerf.push({action: action, timestamp: state.audioContext.currentTime});
        }
      }

      return { ...state, keys: tempKeys, performance: tempPerf };
    }
    case 'MIDI_OK': {
      let devices = [];
      for (var output of action.midiObj.outputs.values()) {
        devices.push(output.name);
      }
      for (var input of action.midiObj.inputs.values()) {
        input.onmidimessage = processMidiMessage;
      }
      return Object.assign({}, state, {midi: action.midiObj, midiDevices: devices});
    }
    case 'CHANGE_MIDI': {
      let output = 0;
      let midiout = state.midi.outputs.values();
      console.log(action);
      while (output < action.device) { output++; midiout.next(); }
      output = midiout.next().value;

      if (action.name.indexOf('APC Key 25')!==-1) {
        // light up a 5x5 matrix
        for (let col = 32; col >= 0; col -= 8) {
          for (let row = 0; row < 5; row += 1) {
            output.send([0x90, col+row, 3]);
          }
        }
      }
      if (action.name.indexOf('Pioneer DDJ-SB')!==-1) {
        // do something else
      }
      return Object.assign({}, state, {midiDevice: action.device, midiOutput: output});
    }
    case 'CREATE_AUDIO_CONTEXT': {
      // DEVEL:
      let socket = IO.connect();
      // DEPLOY:
      // let socket = io.connect('http://rejuicy.com:8092'); (or should it be ws://rejuicy.com:8092???? - TO TEST)

      socket.on('event', function (data) {
        store.dispatch(Object.assign(data.data.action, {synthetic: true}));
      });

      socket.on('roomJoin', function(data) {
        fetchRooms();
      });

      socket.on('get_state', function(data) {
        let myState = Object.assign({}, store.getState());
        delete myState.audioContext;
        delete myState.currentRoom;
        delete myState.lastPlayed;
        delete myState.loggedIn;
        delete myState.markerTime;
        delete myState.masterOut; delete myState.customEffects;
        delete myState.midi; delete myState.activeRooms;
        delete myState.effectsMenuActive; delete myState.midiOutput;
        delete myState.nodes; delete myState.oscGainNodes;
        delete myState.midiDevices;
        delete myState.pitchShiftNode;
        delete myState.playing; delete myState.recording;
        delete myState.sampleBuffers; delete myState.savedSets;
        delete myState.socket; delete myState.synthGainNode;
        delete myState.user;
        myState.name = new Date().toLocaleString();
        let theHeaders = new Headers({ "Content-Type":"application/json" });
        let stringyState = JSON.stringify({state: myState});
        socket.emit('my_state', { set: stringyState, room: JSON.parse(window.localStorage.getItem('com.rejuicy.user')).username });
      });

      let audioCtx = new AudioContext();
      let grainSize = 512;

      let pitchShiftNode = audioCtx.createScriptProcessor(grainSize, 1, 1);
      pitchShiftNode.buffer = new Float32Array(grainSize * 2);
      pitchShiftNode.grainWindow = hannWindow(grainSize);
      pitchShiftNode.onaudioprocess = pitchShifter.bind(pitchShiftNode, 1);

      let BFLo = BiquadFilterLo(audioCtx);
      let BFMid = BiquadFilterMid(audioCtx);
      let BFHi = BiquadFilterHi(audioCtx);
      // let MOOG = MOOGFilter(audioCtx);

      let oscGainNode1 = audioCtx.createGain();
      oscGainNode1.gain.value = 1;
      let oscGainNode2 = audioCtx.createGain();
      oscGainNode2.gain.value = 1;

      let synthGainNode = audioCtx.createGain();
      synthGainNode.gain.value = 0.2;

      let convolver = audioCtx.createConvolver();
      let gainNode = audioCtx.createGain();
      gainNode.gain.value = 1;

      oscGainNode1.connect(synthGainNode);
      oscGainNode2.connect(synthGainNode);
      synthGainNode.connect(gainNode);
      pitchShiftNode.connect(gainNode);
      // let distortion = audioCtx.createWaveShaper();
      // distortion.connect(BFLo)
      // BFLo.connect(convolver);
      // convolver.connect(gainNode);
      // let compressor = audioCtx.createDynamicsCompressor();
      // compressor.threshold.value = -3;
      // compressor.knee.value = 35;
      // compressor.ratio.value = 0.9;
      // //compressor.reduction.value = -20;
      // compressor.attack.value = 0;
      // compressor.release.value = 0;
      // gainNode.connect(compressor);
      // compressor.connect(audioCtx.destination);
      gainNode.connect(audioCtx.destination);

      return Object.assign({}, state, {
        audioContext: audioCtx,
        masterOut: gainNode,
        oscGainNodes: [oscGainNode1, oscGainNode2],
        pitchShiftNode: pitchShiftNode,
        synthGainNode: synthGainNode,
        socket: socket,
      });
    }
    case 'SYNC_TOGGLE': {
      if (state.syncOn) {
        state.pitchShiftNode.disconnect();
        let allSamples = Object.assign([], state.samples);
        for (var sampleColumn of allSamples) {
          for (var sample of sampleColumn) {
            if (sample.playing) { sample.gainNode.connect(state.masterOut); }
          }
        }
        return Object.assign({}, state, {syncOn: false});
      } else {
        state.pitchShiftNode.connect(state.masterOut);
        let allSamples = Object.assign([], state.samples);
        for (var sampleColumn of allSamples) {
          for (var sample of sampleColumn) {
            if (sample.playing) { sample.gainNode.connect(state.pitchShiftNode); }
          }
        }
        return Object.assign({}, state, {syncOn: true});
      }
    }
    case 'FADER_CHANGE': {
      // TODO: do something with the data e.g. adjust volume
      // replay the UI action (it wasn't necessarily caused by a UI change - could be synthetic)
      document.getElementById(action.id).value = action.value;
      let temp = Object.assign([], state.performance);
      if (!action.synthetic) {
        state.socket.emit('event2server', { action: action, room: state.currentRoom });
        temp.push({action: action, timestamp: state.audioContext.currentTime});
      }
      let bpm = state.BPM;
      let faders = Object.assign({}, state.faders);
      faders[action.id] = action.value;
      if (action.id === 'tempoFader') {
        bpm = Math.round((action.value * (state.maxTempo - state.minTempo) / 100) + state.minTempo);
        const ratio = ((bpm + state.minTempo) / state.maxTempo).toFixed(2);
        state.pitchShiftNode.onaudioprocess = pitchShifter.bind(state.pitchShiftNode, ratio);
        for (let col of state.samples) {
          for (let sample of col) {
            // TODO: changing BPM does not affect a sample that's not playing
            if (sample.playing) {
              sample.source.playbackRate.value = ratio;
            }
          }
        }
      }
      if (action.id.substr(0,5) === 'speed') {
        // TODO: changing BPM does not affect a sample that's not playing
        let col = state.samples[action.id.substr(5,1)];
        let colBpm = Math.round((action.value * (state.maxTempo - state.minTempo) / 100) + state.minTempo);
        const ratio = ((colBpm + state.minTempo) / state.maxTempo).toFixed(2);
        for (let sample of col) {
          if (sample.playing) {
            sample.source.playbackRate.value = ratio;
          }
        }
      }
      return Object.assign({}, state, {BPM: bpm, performance: temp, faders: faders});
    }
    case 'STORE_REF_TO_SAMPLE': {
      // so the actual buffer itself is being stored locally on the Sample component,
      // turns out we'll need to grab a reference to it in this reducer, so keep an array of them.
      let temp = Object.assign([], state.sampleBuffers || []);
      temp.push([action.col, action.idx, action.buffer]);
      return Object.assign({}, state, {sampleBuffers: temp});
    }
    case 'SAMPLE_UPLOADED': {
      let temp = Object.assign([], state.samples);
      temp[action.col][action.index].sampleName = action.name;
      temp[action.col][action.index].sampleUrl = action.url;
      temp[action.col][action.index].playing = false;
      // console.log(temp[action.col][action.index]);
      return Object.assign({}, state, {samples: temp});
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
      let temp = Object.assign([], state.performance);
      let temp2 = Object.assign([], state.knobs);
      temp2[action.id] = action.value;
      if (!action.synthetic) {
        temp.push({action: action, timestamp: state.audioContext.currentTime});
        state.socket.emit('event2server', { action: action, room: state.currentRoom });
      }
      if (action.id === '0') { // Global Volume
        state.masterOut.gain.value = action.value / 100;
      }
      if (action.id >= 1 && action.id <= 5) { // one of the sampler column volume knobs
        for (let sample of state.samples[action.id - 1]) {
          if (sample.playing) { sample.gainNode.gain.value = action.value / 100; }
        }
      }
      if (action.id === 6) { // Synth Volume
        temp2[6] = action.value;
        state.synthGainNode.gain.value = action.value / 102 / 5;
      }
      if (action.id >= 7 && action.id <= 12) {            // Oscillator Knobs, Vol+Detune
        temp2[action.id] = action.value;
        if (action.id === 7 || action.id === 8) {         // Oscillator Volume
          state.oscGainNodes[action.id - 7].gain.value = action.value / 100;
        }
      }
      if (action.id >= 13 && action.id <= 20) { // reserved for additional features
      }
      if (action.id > 20) { // one of the effect knobs
        // find which effect it is in our array of active effects
        let effect = state.activeEffects.filter(fx => fx.knobs.indexOf(action.id) !== -1)[0];
        if (effect === undefined) {
          effect = state.activeEffects.filter(fx => fx.knobs.indexOf(action.id - 1) !== -1)[0];
        }
        if (effect.name === 'BiquadFilterLo') {
          // inside that effect component, which knob was tweaked?
          let whichKnob = effect.knobs.indexOf(action.id);
          // the effects of each knob tweak will need to be custom defined for each effect (currently; we can do better)
          if (whichKnob === 0) {
            effect.node.frequency.value = action.value * 15;
          }
        }
        if (effect.name === 'BiquadFilterMid') {
          let whichKnob = effect.knobs.indexOf(action.id);
          if (whichKnob === 0) {
            effect.node.frequency.value = action.value * 15;
          }
        }
        if (effect.name === 'BiquadFilterHi') {
          let whichKnob = effect.knobs.indexOf(action.id);
          if (whichKnob === 0) {
            effect.node.frequency.value = action.value * 15;
          }
        }
        if (effect.name === 'Distortion') {
          let whichKnob = effect.knobs.indexOf(action.id);
          if (whichKnob === 0) {
            effect.node.curve = makeDistortionCurve(.5 * action.value);
          }
        }
        if (effect.name === 'MOOG') {
          let whichKnob = effect.knobs.indexOf(action.id);
          if (whichKnob === 0) {
            effect.node.cutoff = 0.13 * action.value / 100;
          } else {
            effect.node.resonance = 6 * action.value / 256;
          }
        }
      }

      return Object.assign({}, state, {performance: temp, knobs: temp2});
    }
    case 'PLAY_SAMPLE': {
      if (!action.synthetic) {
        state.socket.emit('event2server', { action: action, room: state.currentRoom });
      }

      let allSamples = Object.assign([], state.samples); //clone to avoid mutation
      let theSample = allSamples[action.sample.column][action.sample.index]; //find relevant sample
      theSample.playing = !theSample.playing;
      let time = 0;

      if (theSample.playing || action.loadedFromASavedSet) {
        if (action.loadedFromASavedSet) theSample.playing = true;
        theSample.source = state.audioContext.createBufferSource();
        theSample.source.loop = true;
        if (action.buffer.duration) {
          theSample.source.buffer = action.buffer;
          const ratio = ((state.BPM + state.minTempo) / state.maxTempo).toFixed(2);
          theSample.source.playbackRate.value = ratio;
        } else {
          for (var i = 0; i < COLUMNS * SAMPLES_PER_COLUMN; i++) {
            if ((state.sampleBuffers[i][0] === action.sample.column) && (state.sampleBuffers[i][1] === action.sample.index)) {
              theSample.source.buffer = state.sampleBuffers[i][2];
              const ratio = ((state.BPM + state.minTempo) / state.maxTempo).toFixed(2);
              theSample.source.playbackRate.value = ratio;
            }
          }
        }

        let gainNode = state.audioContext.createGain();
        gainNode.gain.value = state.knobs[action.sample.column + 1] / 100;
        theSample.source.connect(gainNode);
        theSample.gainNode = gainNode;
        if (state.syncOn) {
          gainNode.connect(state.pitchShiftNode);
        } else {
          gainNode.connect(state.masterOut);
        }
        // beat sync
        time = state.lastPlayed === 0 ? state.audioContext.currentTime : state.lastPlayed;
        //TODO: why state.BPM-20 you say? the initial loops we have are at 100bpm
        //but our tempo fader starts at 120. fix this fiddle factor.
        let startNextBarTime = time + 32*(1/((state.BPM-20)));
        while (startNextBarTime < state.audioContext.currentTime) {
          startNextBarTime += 32*(1/((state.BPM-20)));
        }
        theSample.source.start(startNextBarTime - state.audioContext.currentTime);
        // end beat sync
        if (state.midiOutput) {
          state.midiOutput.send([0x90,(32-action.sample.index*8)+action.sample.column,2]);
        }
      } else {
        if (state.midiOutput) {
          state.midiOutput.send([0x90,(32-action.sample.index*8)+action.sample.column,3]);
        }
        theSample.source.stop();
        theSample.source = null;
      }
      return Object.assign({}, state, {samples: allSamples, lastPlayed: time});
    }
    case 'OSC_WAVE_CHANGE': {
      let temp = Object.assign([], state.performance);
      if (!action.synthetic) {
        state.socket.emit('event2server', { action: action, room: state.currentRoom });
        temp.push({action: action, timestamp: state.audioContext.currentTime});
      }

      let newOscWaves = [...state.oscwaves];
      newOscWaves[action.oscnum] = action.wave;

      return {
        ...state,
        oscwaves: newOscWaves,
        performance: temp,
      };
    }
    case 'PATCH_CHANGE': {
      let newOscWaves = [...state.oscwaves];
      let newKnobs = [...state.knobs];

      // set the wave type from the patch for both oscs
      newOscWaves[1] = action.patch[0];
      newOscWaves[2] = action.patch[1];

      // set detune/volume for both oscs
      newKnobs[7] = action.patch[2];
      newKnobs[8] = action.patch[3];
      newKnobs[9] = action.patch[4];
      newKnobs[10] = action.patch[5];

      return Object.assign({}, state, {
        patch: action.patchName,
        knobs: newKnobs,
        oscwaves: newOscWaves,
      });
    }
    case 'EFFECT_MENU_TOGGLE': {
      return Object.assign({}, state, {effectsMenuActive: !state.effectsMenuActive});
    }
    case 'EFFECT_TO_RACK': {
      let effect = action.effect;
      let allActiveEffects = state.activeEffects.slice();
      let allKnobs = state.knobs.slice();

      let newEffectNode = state.customEffects.filter(fx => fx.name === action.effect)[0].node(state.audioContext);
     
      if (allActiveEffects.length === 0) { // this is the first effect unit we're adding
        state.masterOut.disconnect();
        state.masterOut.connect(newEffectNode);
        newEffectNode.connect(state.audioContext.destination);
      } else {
        allActiveEffects[allActiveEffects.length - 1].node.disconnect();
        allActiveEffects[allActiveEffects.length - 1].node.connect(newEffectNode);
        newEffectNode.connect(state.audioContext.destination);
      }
      // add new effect to list of active effects, including refs to its knobs
      allActiveEffects.push({
        name: effect,
        node: newEffectNode,
        knobs: [allKnobs.length, allKnobs + 1],
        faders: [],
      });
      allKnobs.push(100);
      allKnobs.push(100); // different effects will need different numbers of knobs.

      if(effect.name === 'BiquadFilterLo') {
        allKnobs.push(100);
        allKnobs.push(100);
      }

      if(effect.name === 'BiquadFilterMid') {
        allKnobs.push(100);
        allKnobs.push(100);
      }

      if(effect.name === 'BiquadFilterHi') {
        allKnobs.push(100);
        allKnobs.push(100);
      }

      return Object.assign({}, state, {activeEffects: allActiveEffects, knobs: allKnobs});
    }

    case 'FETCH_PROFILE': {
      return Object.assign({}, state, {profile: action.profile});
    }

    case 'EFFECT_FROM_RACK': {
      let allActiveEffects = state.activeEffects.slice();
      let knobPos = action.id.search(/[0-9]/g);
      let textId = action.id.slice(0, knobPos);
      let firstKnob = Number(action.id.slice(knobPos));
      for (var i in allActiveEffects) {
        i = Number(i);
        if (allActiveEffects[i].name === textId & allActiveEffects[i].knobs[0] === firstKnob) {
          allActiveEffects[i].name = 'to be deleted';
          allActiveEffects[i].node.disconnect();
          if (allActiveEffects[i - 1]) { // there is an effect before this one
            if (allActiveEffects[i + 1]) { // and there's one after it
              allActiveEffects[i - 1].node.connect(allActiveEffects[i + 1].node);
            } else { // there's an effect before it, but not after it
              allActiveEffects[i - 1].node.connect(state.audioContext.destination);
            }
          } else { // there's no effect before it
            if (allActiveEffects[i + 1]) {
              state.masterOut.connect(allActiveEffects[i + 1].node);
            } else { // there are no effects left once it's been removed
              state.masterOut.connect(state.audioContext.destination);
            }
          }
        }
      }
      allActiveEffects = allActiveEffects.filter((effect) => effect.name !== 'to be deleted');
      return Object.assign({}, state, {activeEffects: allActiveEffects});
    }
    case 'NAVIGATE_ROOM': {
      let room = action.room;
      state.socket.emit('room', { joinRoom: room,  leaveRoom: state.currentRoom});

      return Object.assign({}, state, {currentRoom: room});
    }
    case 'UPDATE_ACTIVE_ROOMS': {
      return Object.assign({}, state, {activeRooms: action.allActiveRooms});
    }
    default: {
      console.error('Reducer Error: ', action);
      return Object.assign({}, state);
    }
  }
}
