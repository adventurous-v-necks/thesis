export let BiquadFilterLo = (audioCtx) => {
  let filter =   audioCtx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 750;
  filter.gain.value = 25;  
  return filter;
}

export let BiquadFilterMid = (audioCtx) => {
  let filter = audioCtx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1750;
  filter.Q.value = 1000;
  return filter;
}

export let BiquadFilterHi = (audioCtx) => {
  let filter = audioCtx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 2750;
  filter.gain.value = 50;
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