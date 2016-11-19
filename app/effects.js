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
