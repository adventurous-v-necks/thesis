export default function (state, action) {
  if (state === undefined) {
    return {clicks: 0, text: 'If you can see this, it works :)', user: 'none'};
  }

  switch (action.type) {
    case 'ADD_CLICK': {
      // clone the object! the state arg must not be mutated or your app will break
      return Object.assign({}, state, {clicks: state.clicks + 1});
    }
    case 'STORE_USER': {
      return Object.assign({}, state, {user: action.who});
    }
    case 'PRESS_PLAY': {
      console.log('time zero and listening for incoming events');
      return Object.assign({}, state, {timeZero: Date.now()}); // INCOMPLETE, add logic to listen for incoming events
    }
    case 'AUDIO_RECORD': {
      console.log('record music');
      return Object.assign({}, state, {performance: []}); //INCOMPLETE, initialize performance array, override push to push and fire to socket.io
    }
    case 'AUDIO_STOP': {
      console.log('stop music');
      return Object.assign({}, state); //INCOMPLETE
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
      return Object.assign({}, state);
    }   
    case 'KNOB_TWIDDLE': {
      console.log('a knob has been twiddled ',action);
      return Object.assign({}, state, {volume: action.volume});
    }
    default: {
      console.error('Reducer Error: ', action);
      return Object.assign({}, state);
    }
  }
};
