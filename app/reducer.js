let events = 0;
let playTime = 0;

const sched = function() {
  var nextEvent = this.performance[events];
  if (!nextEvent) return;
  window.requestAnimationFrame(sched.bind(this));
  var when = Math.abs(nextEvent.timestamp - this.timeZero);
  var delta = playTime + when;
  if (this.audioContext.currentTime - delta >= 0) {
    // trigger the event
    reduce(this,nextEvent.action);
    events++;
  }
};

export default function reduce(state, action) {
  if (state === undefined) {
    return {
      performance: [],
      user: 'none',
      clicks: 0,
      // Tempo
      bpmFactor: 50,
      minTempo: 60,
      maxTempo: 180,
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
      console.log('record music');
      return Object.assign({}, state, {performance: []}); //INCOMPLETE, initialize performance array, override push to push and fire to socket.io
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
      // TODO: do something with the data e.g. adjust volume
      console.log('a fader called '+action.id+' changed to '+ action.value);

      document.getElementById(action.id).value = action.value;
      var temp = state.performance.slice();
      temp.push({action: action, timestamp: state.audioContext.currentTime});

      if (action.id === 'tempoFader') {
        return Object.assign({}, state, {bpmFactor: action.value, performance: temp});
      }

      return Object.assign({}, state, {performance: temp});
    }
    case 'PLAY': {
      events = 0;
      playTime = state.audioContext.currentTime;
      window.requestAnimationFrame(sched.bind(state));
      return Object.assign({}, state);
    }   
    case 'KNOB_TWIDDLE': {
      // TODO: do something with the data e.g. adjust volume
      console.log('a knob has been twiddled '+action.id+' twiddled to '+ action.value);
      return Object.assign({}, state);
    }
    default: {
      console.error('Reducer Error: ', action);
      return Object.assign({}, state);
    }
  }
};
