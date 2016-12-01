import {store} from '../main.js';

export const userReducer = function(state, action) {

  if (state === undefined) return {
    loggedIn: !!window.localStorage.getItem('com.rejuicy.user'),
    currentRoom: '',
    user: 'none',
  };

  switch (action.type) {
    case 'USER_LOGIN': {
      let newUserRoom = JSON.parse(window.localStorage.getItem('com.rejuicy.user')).username;
      return Object.assign({}, state, {loggedIn: true, currentRoom: newUserRoom});
    }
    case 'USER_LOGOUT': {
      return Object.assign({}, state, {loggedIn: false});
    }
    case 'NAVIGATE_ROOM': {
      let room = action.room;
      store.getState().state.socket.emit('room', { joinRoom: room,  leaveRoom: state.user.currentRoom});
      return Object.assign({}, state, {currentRoom: room});
    }
    default: {
      return Object.assign({}, state);
    }
  }
};
