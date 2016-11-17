export default function(state, action) {
  switch (action.type) {
    case 'MARKER_UPDATE': {
      return Object.assign({}, state, {markerTime: state.audioContext.currentTime - state.recordStartTime});
    }

    return state;
  }

}