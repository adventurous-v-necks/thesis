import {hannWindow, linearInterpolation, pitchShifter} from '../../audioHelpers.js';
import {store} from '../../main.js';
import io from 'socket.io-client';
var socket = io.connect();

export default function(state, action) {
  switch (action.type) {
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
      return Object.assign({}, state, {audioContext: audioCtx, masterOut: gainNode, pitchShiftNode: pitchShiftNode, synthGainNode: synthGainNode});
    }
    return state;
  }

}