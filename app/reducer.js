// "maybe just add a line of whitespace"

let events = 0;
let playTime = 0;

// set up our samples grid - 5x5 boxes
let COLUMNS = 5;
let SAMPLES_PER_COLUMN = 5;

import {hannWindow, linearInterpolation, pitchShifter} from './audioHelpers.js';

import {BiquadFilter, BiquadFilterLo, BiquadFilterMid, BiquadFilterHi, Distortion, makeDistortionCurve} from './effects.js';
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
      nodes: [], // notes of the keyboard which are playing,
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
        100, 100
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
          name: 'distortionis',
          node: Distortion,
        }],
      activeEffects: [],
      syncOn: true,
      lastPlayed: 0, // time (audio time) the last sample was played
      activeRooms: [],
      currentRoom: '',
      roomsMenuActive: false,
      midi: null, // the midi object as a whole, if we got one
      midiDevices: [],
      midiDevice: 0, // an integer selection 0-n from the midi outputs available on midi object
      midiOutput: null, // the actual midi output object to send messages on
    };
  }

  switch (action.type) {
    case 'USER_LOGIN': {
      let newUserRoom = JSON.parse(window.localStorage.getItem('com.rejuicy.user')).username;

      state.socket.emit('room', { joinRoom: newUserRoom});

      let allActiveRooms = state.activeRooms.slice();
      allActiveRooms.concat(newUserRoom)

      return Object.assign({}, state, {loggedIn: true, activeRooms: allActiveRooms, currentRoom: newUserRoom});
    }
    case 'USER_LOGOUT': {
      return Object.assign({}, state, {loggedIn: false});
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
      // TODO: optimize this -- use a hash table instead of an array
      // TODO: this is not working polyphonically - try pressing 2 keys at once
      let newNodes = [];
      for (let i = 0; i < state.nodes.length; i++) {
        if (Math.round(state.nodes[i].frequency.value) === Math.round(action.frequency)) {
          state.nodes[i].stop(0);
          state.nodes[i].disconnect();
        } else {
          newNodes.push(nodes[i]);
        }
      }
      let temp = Object.assign([], state.performance);
      if (!action.synthetic) {
        state.socket.emit('event2server', { action: action, room: state.currentRoom });
        temp.push({action: action, timestamp: state.audioContext.currentTime});
      }
      return Object.assign({}, state, {nodes: newNodes, performance: temp});
    }
    case 'KEY_DOWN': {
      let temp = Object.assign([], state.nodes);
      let temp2 = Object.assign([], state.performance);
      console.log(action.frequency);
      for (let i = 0; i < 2; i++) {
        let oscillator = state.audioContext.createOscillator();
        oscillator.type = state.oscwaves[i + 1]; //TODO: only works for one synth sound right now
        oscillator.frequency.value = action.frequency;
        // oscillator.detune.value = state.oscdetune[i + 1];
        oscillator.detune.value = (state.knobs[i + 9] - 127.5) * (200 / 255);

        oscillator.connect(state.oscGainNodes[i]);
        oscillator.start(0);
        temp.push(oscillator);
        if (!action.synthetic) {
          state.socket.emit('event2server', { action: action, room: state.currentRoom });
          temp2.push({action: action, timestamp: state.audioContext.currentTime});
        }
      }

      return Object.assign({}, state, {nodes: temp, performance: temp2});
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

      let audioCtx = new AudioContext();
      let grainSize = 512;

      let pitchShiftNode = audioCtx.createScriptProcessor(grainSize, 1, 1);
      pitchShiftNode.buffer = new Float32Array(grainSize * 2);
      pitchShiftNode.grainWindow = hannWindow(grainSize);
      pitchShiftNode.onaudioprocess = pitchShifter.bind(pitchShiftNode, 1);

      let BFLo = BiquadFilterLo(audioCtx);
      let BFMid = BiquadFilterMid(audioCtx);
      let BFHi = BiquadFilterHi(audioCtx);

      let oscGainNode1 = audioCtx.createGain();
      oscGainNode1.gain.value = 1;
      let oscGainNode2 = audioCtx.createGain();
      oscGainNode2.gain.value = 1;

      let synthGainNode = audioCtx.createGain();
      synthGainNode.gain.value = 0.4;

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
      let bpm = Object.assign({}, state.BPM);
      if (action.id === 'tempoFader') {
        bpm = Math.round((action.value * (state.maxTempo - state.minTempo) / 100) + state.minTempo);
        const ratio = ((bpm + state.minTempo) / state.maxTempo).toFixed(2);
        state.pitchShiftNode.onaudioprocess = pitchShifter.bind(state.pitchShiftNode, ratio);
        for (let col of state.samples) {
          for (let sample of col) {
            if (sample.playing) {
              sample.source.playbackRate.value = ratio;
            }
          }
        }
      }
      return Object.assign({}, state, {BPM: bpm, performance: temp});
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
        state.synthGainNode.gain.value = action.value / 100 / 5;
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
        var effect = state.activeEffects.filter(fx => fx.knobs.indexOf(action.id) !== -1)[0];
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
        if (effect.name === 'distortion') {
          let whichKnob = effect.knobs.indexOf(action.id);
          if (whichKnob === 0) {
            effect.node.curve = makeDistortionCurve(.5 * action.value);
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

      if (theSample.playing) {
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
      const newOscWaves = [null, action.patch, action.patch];

      return Object.assign({}, state, {
        patch: action.patch,
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

      if(effect.name === "BiquadFilterLo") {
        allKnobs.push(100);
        allKnobs.push(100);
      }

      if(effect.name === "BiquadFilterMid") {
        allKnobs.push(100);
        allKnobs.push(100);
      }

      if(effect.name === "BiquadFilterHi") {
        allKnobs.push(100);
        allKnobs.push(100);
      }

      return Object.assign({}, state, {activeEffects: allActiveEffects, knobs: allKnobs});
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
    case 'ROOM_MENU_TOGGLE': {
      return Object.assign({}, state, {roomsMenuActive: !state.roomsMenuActive});
    }
    case 'NAVIGATE_ROOM': {
      let room = action.room;
      state.socket.emit('room', { joinRoom: room,  leaveRoom: state.currentRoom});
      return Object.assign({}, state, {currentRoom: room});
    }
    case 'UPDATE_ACTIVE_ROOMS': {
      return Object.assign({}, state, {activeRooms: action.activeRooms});
    }
    default: {
      console.error('Reducer Error: ', action);
      return Object.assign({}, state);
    }
  }
}
