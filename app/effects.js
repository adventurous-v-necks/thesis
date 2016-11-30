export let BiquadFilterLo = (audioCtx) => {
  let filter =   audioCtx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 750;
  filter.gain.value = 25;
  filter.Q.value = 2;  
  return filter;
}

export let BiquadFilterMid = (audioCtx) => {
  let filter = audioCtx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1750;
  filter.Q.value = 2;
  return filter;
}

export let BiquadFilterHi = (audioCtx) => {
  let filter = audioCtx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 2750;
  filter.gain.value = 50;
  filter.Q.value = 2;
  return filter;
}

export let MOOGFilter = (audioCtx) => {
  // Mostly taken from: noisehack.com/custom-audio-effects-javascript-web-audio-api/
  let bufferSize = 4096;
  console.log('inside effects MOOGFilter')
  let filter = audioCtx.createScriptProcessor(bufferSize, 1, 1);
  let in1, in2, in3, in4, out1, out2, out3, out4;
  in1 = in2 = in3 = in4 = out1 = out2 = out3 = out4 = 0.0;
  filter.cutoff = 0.065 * 2;
  filter.resonance = 6 * 100 / 256 // 6 * default knob value * max knob value
  filter.onaudioprocess = function(e) {
    let input = e.inputBuffer.getChannelData(0);
    let output = e.outputBuffer.getChannelData(0);
    let f = filter.cutoff * 1.16;
    let fb = filter.resonance * (1.0 - 0.15 * f * f);
    for (let i = 0; i < bufferSize; i++) {
      input[i] -= out4 * fb;
      input[i] *= 0.35013 * (f*f)*(f*f);
      out1 = input[i] + 0.3 * in1 + (1 - f) * out1;
      in1 = input[i];
      out2 = out1 + 0.3 * in2 + (1 - f) * out2;
      in2 = out1;
      out3 = out2 + 0.3 * in3 + (1 - f) * out3;
      in3 = out2;
      out4 = out3 + 0.3 * in4 + (1 - f) * out4;
      in4 = out3;
      output[i] = out4;
    }
  }
  return filter;
}

export let Distortion = (audioCtx) => {
	let filter = audioCtx.createWaveShaper();
	filter.curve = makeDistortionCurve(400);
	filter.oversample = '4x';
	return filter;
}

// Helper function for Distortion effect
export let makeDistortionCurve = (amount) => {
	let k = typeof amount === 'number' ? amount : 50;
	let n_samples = 44100;
	let curve = new Float32Array(n_samples);
	let deg = Math.PI / 180;
	let i = 0;
	let x;
	  
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
};