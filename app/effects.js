export let BiquadFilter = (audioCtx) => {
  let filter = audioCtx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1000;
  filter.gain.value = 2;
  return filter;
}
