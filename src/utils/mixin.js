import { mapGetters, mapActions } from "vuex";
import {themeList} from "./book";
import {setLocalStorage} from "./localStorage";

export const ebookMixin = {
    computed: {
        ...mapGetters([
            'fileName',
            'menuVisible',
            'settingVisible',
            'defaultFontSize',
            'defaultFontFamily',
            'fontFamilyVisible',
            'rendition',
            'defaultTheme',
            'progress',
            'bookAvailable',
            'book',
            'section',
            'cover',
            'metaData',
            'navigation',
            'offsetY',
            // 'searchVisible',
        ]),
        themeList() {
            return themeList(this)
        },
    },
    methods: {
        ...mapActions([
            'setMenuVisible',
            'setFileName',
            'setSettingVisible',
            'setDefaultFontSize',
            'setDefaultFontFamily',
            'setFontFamilyVisible',
            'setRendition',
            'setDefaultTheme',
            'setProgress',
            'setBookAvailable',
            'setBook',
            'setSection',
            'setCover',
            'setMetaData',
            'setNavigation',
            'setOffsetY',
            // 'setSearchVisible',
        ]),
        display(target, cb) {
            if (target) {
                this.rendition.display(target)
                    .then(() => {
                        this.refreshLocation()
                        cb && cb()
                    })
            } else {
                this.rendition.display()
                    .then(() => {
                        this.refreshLocation()
                        cb && cb()
                    })
            }
        },
        refreshLocation() {
            setTimeout(() => {
                const currentLocation = this.book.rendition.currentLocation()

                currentLocation.start && (this._progress = Math.floor(this.book.locations.percentageFromCfi(currentLocation.start.cfi) * 100))
                this.setProgress(this._progress || 0)
                setLocalStorage('section', {bookName: this.fileName, section: this.section})
            }, 100)

        },
        hideTitleAndMenu() {
            this.setMenuVisible(false)
            this.setSettingVisible(-1)
            this.setFontFamilyVisible(false)
        },
    }
}

export const storeHomeMixin = {
  computed: {
    ...mapGetters([
      'offsetY',
      'hotSearchOffsetY',
      'flapCardVisible',
    ])
  },
  methods: {
    ...mapActions([
      'setOffsetY',
      'setHotSearchOffsetY',
      'setFlapCardVisible',
    ])
  }
}
