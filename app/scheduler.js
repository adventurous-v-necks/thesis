import {store} from './main.js';

let events = 0;
let playTime = 0;

export const incEvents = function() { events += 1; };

export const setPlayTime = function(v) { playTime = v; };

export const sched = function() {
  let state = store.getState();
  let nextEvent = state.state.performance[events];
  if (!nextEvent) { return; }
  window.requestAnimationFrame(sched);
  let when = Math.abs(nextEvent.timestamp - state.state.recordStartTime);
  let delta = playTime + when;
  store.dispatch({type: 'MARKER_UPDATE'});
  if (state.state.audioContext.currentTime - delta >= 0) {
    // trigger the event
    store.dispatch(Object.assign(nextEvent.action, {synthetic: true}));
    events++;
  }
};
