export default function(state, action) {
  switch (action.type) {
     case 'AUDIO_RECORD': { // should start and restart (from pause) recording
      if (!state.recording) {
        return Object.assign({}, state, {
          recording: true,
          recordStartTime: state.audioContext.currentTime,
          performance: [],
        });
      } else {
        return Object.assign({}, state, {
          recording: false,
        });
      }
    }

    return state;
  }

}