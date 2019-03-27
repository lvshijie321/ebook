export default {
    setFileName: ({ commit }, payload) => {
        return commit('SET_FILE_NAME', payload)
    },
    setMenuVisible: ({ commit }, payload) => {
        return commit('SET_MENU_VISIBLE', payload)
    },
    setSettingVisible: ({ commit }, payload) => {
        return commit('SETTING_VISIBLE', payload)
    },
    setDefaultFontSize: ({ commit }, payload) => {
        return commit('SETTING_DEFAULT_FONT_SIZE', payload)
    },
    setDefaultFontFamily: ({ commit }, payload) => {
        return commit('SET_DEFAULT_FONT_FAMILY', payload)
    },
    setFontFamilyVisible: ({ commit }, payload) => {
        return commit('SET_FONT_FAMILY_VISIBLE', payload)
    },
    setRendition: ({ commit }, payload) => {
        return commit('SET_RENDITION', payload)
    },
    setDefaultTheme: ({ commit }, payload) => {
        return commit('SET_DEFAULT_THEME', payload)
    },
    setProgress: ({ commit }, payload) => {
        return commit('SET_PROGRESS', payload)
    },

    setBookAvailable: ({ commit }, payload) => {
        return commit('SET_BOOK_AVAILABLE', payload)
    },
    setBook: ({ commit }, payload) => {
        return commit('SET_BOOK', payload)
    },
    setSection: ({ commit }, payload) => {
        return commit('SET_SECTION', payload)
    },
    setCover: ({ commit }, payload) => {
        return commit('SET_COVER', payload)
    },
    setMetaData: ({ commit }, payload) => {
        return commit('SET_META_DATA', payload)
    },
    setNavigation: ({ commit }, payload) => {
        return commit('SET_NAVIGATION', payload)
    },
    setOffsetY: ({ commit }, payload) => {
        return commit('SET_OFFSET_Y', payload)
    },
    // setSearchVisible: ({ commit }, payload) => {
    //     return commit('SET_SEARCH_VISIBLE', payload)
    // },

}
