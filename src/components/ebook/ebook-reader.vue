<template>
  <div class="ebook-reader">
    <div id="read"></div>
    <div ref="control"
         class="control"
         @mousedown.left="onMouseEnter"
         @mousemove.left="onMouseMove"
         @mouseup.left="onMouseEnd"></div>
  </div>
</template>

<script>
  const FILE_SPLIT_SYMBOL = '.'
  import Epub from 'epubjs'
  import {ebookMixin} from '../../utils/mixin'
  import {getLocalStorage} from '../../utils/localStorage'
  import {initGlobalTheme, diaplaySection, flatten} from "../../utils/book";

  global.ePub = Epub

  export default {
    name: 'EbookReader',
    mixins: [ebookMixin],
    data() {
      return {}
    },
    mounted() {
      this.initEpub()
    },
    methods: {
      prevPage() {
        this._rendition && this._rendition.prev().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      },
      nextPage() {
        this._rendition && this._rendition.next().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()

      },
      toggleTitleAndMenu() {
        this.setMenuVisible(!this.menuVisible)
        this.menuVisible && this.setSettingVisible(-1)
        this.setFontFamilyVisible(false)
      },

      initFontSize() {
        let fontSize = getLocalStorage('font_size')
        fontSize = fontSize && fontSize[this.fileName]
          ? fontSize[this.fileName]
          : this.defaultFontSize
        this._rendition.themes.fontSize(fontSize)
        this.setDefaultFontSize(fontSize)
      },
      initFontFamily() {
        let fontFamily = getLocalStorage('font_family')
        fontFamily = fontFamily && fontFamily[this.fileName]
          ? fontFamily[this.fileName]
          : this.defaultFontFamily
        this._rendition.themes.font(fontFamily)
        this.setDefaultFontFamily(fontFamily)
      },
      initTheme() {
        // 注册 epub 背景色
        this.themeList.forEach(item => {
          this._rendition.themes.register(item.name, item.style)
        })
        // 设置 epub 背景色
        const themeName = getLocalStorage('theme') || this.themeList.find(item => item.name === this.defaultTheme).name
        this.setDefaultTheme(themeName)
        this._rendition.themes.select(themeName)
        // 设置主题色
        initGlobalTheme(themeName)
      },
      initRendition() {
        this._rendition = this._book.renderTo('read', {
          width: innerWidth,
          height: innerHeight,
          method: 'default'
        })
        this.setRendition(this._rendition)

        this.display.call(this, null, () => {
          this.initFontSize()
          this.initTheme()
        })
        // iframe 内无法获取父级的 css， 向 iframe 注入 css
        this._rendition.hooks.content.register(content => {
          Promise.all([
            content.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
            content.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
            content.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
            content.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`),
          ]).then(() => {
            this.initFontFamily()
            console.log(process.env)
          })

        })
      },
      initGesture() {
        // this._rendition.on('touchstart', event => {
        // })
        // this._rendition.on('touchend', event => {
        // })
        const controlDom = this.$refs.control
        controlDom.addEventListener('touchstart', event => {

          this._clientXEnter = event.changedTouches[0].clientX
          this._timeStampEnter = event.timeStamp
        })
        controlDom.addEventListener('touchend', event => {
          const offsetX = event.changedTouches[0].clientX - this._clientXEnter
            , duringTime = event.timeStamp - this._timeStampEnter
            , minTime = 150
            , minOffset = 40
          if (offsetX > minOffset && duringTime > minTime) { // 往右滑动
            this.nextPage()
          } else if (offsetX < -minOffset && duringTime > minTime) { // 往左滑动
            this.prevPage()
          } else {
            this.toggleTitleAndMenu()
          }

          this.setOffsetY(this._clientY = 0)
          //event.preventDefault() // 禁止默认行为，如取消 div 的 本具的 click 事件
          event.stopPropagation() // 这个函数的作用是阻止事件进一步冒泡，进而被其他节点接收。
        })

        controlDom.addEventListener('touchmove', event => {
          if (!this._clientY) {
            this._clientY = event.changedTouches[0].clientY
          } else {
            if (event.changedTouches[0].clientY - this._clientY > 15) {
              this.setOffsetY(event.changedTouches[0].clientY - this._clientY)
            }
          }
          event.preventDefault() // 禁止默认行为，微信内下拉显示此网页由。。。提供

        })

      },
      parseBook() {
        this.book.loaded.cover
          .then(cover => {
            return this.book.archive.createUrl(cover)
          })
          .then(url => {
            this.setCover(url)

          })

        this.book.loaded.metadata.then(metadata => {
          this.setMetaData(metadata)
        })
        this.book.loaded.navigation.then(nav => {
          const toc = flatten(nav.toc)
          toc.forEach(item => item.level = find(item))
          this.setNavigation(toc)

          function find(item, level = 0) {
            return !item.parent
              ? level
              : find(toc.filter(parentItem => parentItem.id === item.parent), ++level)

          }
        })
      },

      initEpub() {
        this.setFileName(this.$route.params.fileName.split(FILE_SPLIT_SYMBOL).join('/')).then(() => {
          this._book = new Epub(`${process.env.VUE_APP_RES_URL}/epub/${this.fileName}.epub`)
          this.setBook(this._book)

          this.initRendition()


          this.initGesture()
          this.parseBook()
          this._book.ready.then(() => {
            return this._book.locations.generate(750 * innerWidth / 375)
          }).then(locations => {
            this.setBookAvailable(true)
            const section = getLocalStorage("section") || this.section

            this.setSection(section)
              .then(() => {
                  diaplaySection.call(this)
                }
              )


          })
        })
      },
      onMouseEnter(event) {
        this._clientXEnter = event.clientX
        this._timeStampEnter = event.timeStamp

      },
      onMouseEnd(event) {
        const offsetX = event.clientX - this._clientXEnter
          , duringTime = event.timeStamp - this._timeStampEnter
          , minTime = 150
          , minOffset = 40
        if (offsetX > minOffset && duringTime > minTime) { // 往右滑动
          this.nextPage()
        } else if (offsetX < -minOffset && duringTime > minTime) { // 往左滑动
          this.prevPage()
        } else {
          this.toggleTitleAndMenu()
        }

        this.setOffsetY(this._clientY = 0)
        //event.preventDefault() // 禁止默认行为，如取消 div 的 本具的 click 事件
        event.stopPropagation() // 这个函数的作用是阻止事件进一步冒泡，进而被其他节点接收。
      },
      onMouseMove(event) {
        // if (!this._clientY) {
        //   this._clientY = event.clientY
        // } else {
        //   if (event.clientY - this._clientY > 15) {
        //     this.setOffsetY(event.clientY - this._clientY)
        //   }
        // }
        // event.preventDefault() // 禁止默认行为，微信内下拉显示此网页由。。。提供
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .ebook-reader {
    position: relative;

    .control {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
  }
</style>
