import * as types from '../mutation-types'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const state = {
  markers: {},
  authenticatedUser: {},
  config: {
    googleMaps: {
      apiKey: 'AIzaSyBYfA-RXtr4hN-kmxfAUZ7MUEvM-hTIRoE',
      zoom: 2,
      center: {"lat":59.64165449249,"lng":71.20819433322},
    },
    // must be changed after passport install comand(in back side)
    client_secret: 'wcMRri8S7sF7Q6QYvjzAkM7BpLpdMJayMBK4vfPV',
    client_id: 2,
    grant_type: 'password'
  }
}

const mutations = {
  [types.SIGN_IN] (state, data) {
    data.client_id = state.config.client_id
    data.client_secret = state.config.client_secret
    data.grant_type = state.config.grant_type
    axios.post('oauth/token', data)
      .then((response) => {
        // axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
        localStorage.setItem('token', response.data.access_token)
        localStorage.setItem('expiration', response.data.expires_in + Date.now())
        axios.get('api/user')
          .then((user) => {
            state.authenticatedUser = user
            console.log('state.authenticatedUser', state.authenticatedUser);
          })
          .catch(() => {
            console.log(error);
          })
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  [types.SET_AUTHENTICATED_USER] (state, user) {
    state.authenticatedUser = user;
  },
  [types.CHANGE_CENTER_POSITION] (state, newCoords) {
    state.config.googleMaps.zoom = 13;
    state.config.googleMaps.center = newCoords;
  },
  [types.SET_AUTHENTICATED_USER] (state, user) {
    state.authenticatedUser = user;
  },
  [types.DELETE_FROM_LIST] (state, index) {
      state.markers.splice(index, 1);
  },
  [types.SET_MARKER_VISITED] (state, index) {
    state.markers[index].visited = true;
    state.markers[index].iconImage = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  },

  [types.ADD_NEW_MARKER] (state, marker) {
    console.log('prepare to add new marker', marker);
    // state.markers.push(marker);
    axios.post('api/markers', {
        content: marker.content,
        coords: marker.coords,
        user_id: state.authenticatedUser.id
    })
      .then(function (response) {
        console.log('store', response);
        // state.markers = response;
      })
      .catch(function (error) {
        console.log(error);
      });

  },
  [types.GET_USER_MARKERS] (state) {
    if(state.authenticatedUser.id) {
      axios.get('api/markers/')
        .then(response => state.markers = response)
        .catch(error => console.log(error));
    }
  }
}

const actions = {
  signIn ({ commit }, data) {
    commit(types.SIGN_IN, data)
  },
  setAuthenticatedUser ({ commit }, user) {
    commit(types.SET_AUTHENTICATED_USER, user)
  },
  deleteFromList ({ commit }, index) {
    commit(types.DELETE_FROM_LIST, index)
  },
  setMarkerVisited ({ commit }, index) {
    commit(types.SET_MARKER_VISITED, index)
  },
  addNewMarker ({ commit }, newMarker) {
    commit(types.ADD_NEW_MARKER, newMarker)
  },
  getUserMarkers ({ commit }) {
    commit(types.GET_USER_MARKERS)
  },
  changeCenterPosition ({ commit }, newCoords) {
    commit(types.CHANGE_CENTER_POSITION, newCoords)
  }
}

export default {
  state,
  mutations,
  actions
}
