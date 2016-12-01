import {store} from './main.js';

export const fetchRooms = () => {
  let theHeaders = new Headers({ "Content-Type": "application/json" });
  fetch('/liveRooms', {credentials: 'include', method: 'GET', headers: theHeaders}).then(resp => {
    resp.json().then(r => {
      if (r.status === 'ok') {
        if (r.rooms.length !== 0) {
          store.dispatch({type: 'UPDATE_ACTIVE_ROOMS', allActiveRooms: r.rooms})
        }
      }
    });
  });
};
