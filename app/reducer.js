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
    case 'TIME_ZERO': {
      console.log('time zero');
      return Object.assign({}, state, {timeZero: Date.now()});
    }
    case 'KEY_UP': {
      console.log('key up', action);
      return Object.assign({}, state, {performance: state.performance.push({action, timestamp: Date.now() - state.timeZero})});
    }
    case 'KEY_DOWN': {
      console.log('key down', action);
      return Object.assign({}, state, {performance: state.performance.push({action, timestamp: Date.now() - state.timeZero})});
    }
    case 'CREATE_AUDIO_CONTEXT': {
      return Object.assign({}, state, {audioContext: new AudioContext()});
    }
    default: {
      console.error('Reducer Error: ', action);
      return Object.assign({}, state);
    }
  }
};
