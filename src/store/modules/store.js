export default {
  state: {
    hotSearchOffsetY: 0,
    flapCardVisible: false,
  },
  mutations: {
    SET_HOT_SEARCH_OFFSET_Y: (state, payload) => state.hotSearchOffsetY = payload,
    SET_FLAP_CARD_VISIBLE: (state, payload) => state.flapCardVisible = payload,
  }
}
