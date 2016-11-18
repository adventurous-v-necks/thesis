export default function(state, action) {
  switch (action.type) {
    case 'STORE_USER': {
      return Object.assign({}, state, {user: action.who});
    }
    return state;
  }

}