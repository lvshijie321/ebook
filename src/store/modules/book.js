export default {
    state: {
        fileName: '',
        menuVisible: false,
        settingVisible: -1, // -1：不显示、0：字号、1：主题、2：进度、3：目录
        defaultFontSize: 16,
        defaultFontFamily: 'Default',
        fontFamilyVisible: false,
        rendition: undefined,
        defaultTheme: 'Default',
        progress: 0,
        bookAvailable: false,
        book: null,
        section: 0,
        cover: null,
        metaData: {},
        navigation: [],
        offsetY: 0,
        // searchVisible: false,
    },
    mutations: {
        SET_FILE_NAME: (state, payload) => {
            state.fileName = payload
        },
        SET_MENU_VISIBLE: (state, payload) => {
            state.menuVisible = payload
        },
        SETTING_VISIBLE: (state, payload) => {
            state.settingVisible = payload
        },
        SETTING_DEFAULT_FONT_SIZE: (state, payload) => {
            state.defaultFontSize = payload
        },
        SET_DEFAULT_FONT_FAMILY: (state, payload) => {
            state.defaultFontFamily = payload
        },
        SET_FONT_FAMILY_VISIBLE: (state, payload) => {
            state.fontFamilyVisible = payload
        },
        SET_RENDITION: (state, payload) => {
            state.rendition = payload
        },
        SET_DEFAULT_THEME: (state, payload) => {
            state.defaultTheme = payload
        },
        SET_PROGRESS: (state, payload) => {
            state.progress = payload
        },
        SET_BOOK_AVAILABLE: (state, payload) => {
            state.bookAvailable = payload
        },
        SET_BOOK: (state, payload) => {
            state.book = payload
        },
        SET_SECTION: (state, payload) => {
            state.section = payload
        },
        SET_COVER: (state, payload) => {
            state.cover = payload
        },
        SET_META_DATA: (state, payload) => {
            state.metaData = payload
        },
        SET_NAVIGATION: (state, payload) => {
            state.navigation = payload
        },
        SET_OFFSET_Y: (state, payload) => {
            state.offsetY = payload
        },
        // SET_SEARCH_VISIBLE: (state, payload) => {
        //     state.searchVisible = payload
        // },

    },
    actions: {

    }
}
