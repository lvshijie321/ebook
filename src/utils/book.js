import {setLocalStorage} from "./localStorage";

export const FONT_SIZE_LIST = [
    {fontSize: 12},
    {fontSize: 14},
    {fontSize: 16},
    {fontSize: 18},
    {fontSize: 20},
    {fontSize: 22},
    {fontSize: 24},
]

export const FONT_FAMILY = [
    {font: 'Default'},
    {font: 'Cabin'},
    {font: 'Days One'},
    {font: 'Montserrat'},
    {font: 'Tangerine'},
]

export function themeList(vue) {
    return [
        {
            alias: vue.$t('book.themeDefault'),
            name: 'Default',
            style: {
                body: {
                    'color': '#4c5059',
                    'background': '#cecece',
                    'padding-top': `${realPx(48)}px!important`,
                    'padding-bottom': `${realPx(48)}px!important`
                },
                img: {
                    'width': '100%'
                },
                '.epubjs-hl': {
                    'fill': 'red', 'fill-opacity': '0.3', 'mix-blend-mode': 'multiply'
                }
            }
        },
        {
            alias: vue.$t('book.themeGold'),
            name: 'Gold',
            style: {
                body: {
                    'color': '#5c5b56',
                    'background': '#c6c2b6',
                    'padding-top': `${realPx(48)}px!important`,
                    'padding-bottom': `${realPx(48)}px!important`
                },
                img: {
                    'width': '100%'
                },
                '.epubjs-hl': {
                    'fill': 'red', 'fill-opacity': '0.3', 'mix-blend-mode': 'multiply'
                }
            }
        },
        {
            alias: vue.$t('book.themeEye'),
            name: 'Eye',
            style: {
                body: {
                    'color': '#404c42',
                    'background': '#a9c1a9',
                    'padding-top': `${realPx(48)}px!important`,
                    'padding-bottom': `${realPx(48)}px!important`
                },
                img: {
                    'width': '100%'
                },
                '.epubjs-hl': {
                    'fill': 'red', 'fill-opacity': '0.3', 'mix-blend-mode': 'multiply'
                }
            }
        },
        {
            alias: vue.$t('book.themeNight'),
            name: 'Night',
            style: {
                body: {
                    'color': '#cecece',
                    'background': '#000000',
                    'padding-top': `${realPx(48)}px!important`,
                    'padding-bottom': `${realPx(48)}px!important`
                },
                img: {
                    'width': '100%'
                },
                '.epubjs-hl': {
                    'fill': 'red', 'fill-opacity': '0.3', 'mix-blend-mode': 'multiply'
                }
            }
        }
    ]
}

export function initGlobalTheme(themeName) {
    switch (themeName) {
        case "Gold":
            addClass(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
            break
        case "Eye":

            addClass(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
            break
        case "Night":

            addClass(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
            break
        case "Default":
        default:

            addClass(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)

    }

}

export function refreshLocation() {
    setTimeout(() => {
        const currentLocation = this.book.rendition.currentLocation()

        currentLocation.start && (this._progress = Math.floor(this.book.locations.percentageFromCfi(currentLocation.start.cfi) * 100))
        this.setProgress(this._progress || 0)
        setLocalStorage('section', this.section)
    }, 100)

}

export function diaplaySection() {
    const section = this.book.section(this.section)
    section && section.href && this.rendition.display(section.href).then(() => refreshLocation.call(this))


}

export function flatten(array) {
    return [].concat(...array.map(item => [].concat(item, ...flatten(item.subitems))))
}
function realPx() {

}


function addClass(href) {
    const id = "theme"
        , theme = document.getElementById(id)
    if (!theme) {
        const link = document.createElement('link')
        link.setAttribute('rel', 'stylesheet')
        link.setAttribute('type', 'text/css')
        link.setAttribute('href', href)
        link.setAttribute('id', id)
        document.querySelector('head').appendChild(link)
    } else {
        theme.setAttribute("href", href)
    }

}
