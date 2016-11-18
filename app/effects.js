export let BiquadFilterMidRange = (audioCtx) => {
  let filter = audioCtx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1750;
  filter.Q.value = 1000;
  return filter;
}

export let BiquadFilterHiRange = (audioCtx) => {
  let filter = audioCtx.createBiquadFilter();
  filter.type = "highshelf";
  filter.frequency.value = 2750;
  filter.gain.value = 20;
  return filter;
}

export let BiquadFilterLowRange = (audioCtx) => {
  let filter = audioCtx.createBiquadFilter();
  filter.type = "lowshelf";
  filter.frequency.value = 750;
  filter.gain.value = 20;
  return filter;
}