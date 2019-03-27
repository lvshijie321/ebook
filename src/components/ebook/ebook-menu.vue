<template>
    <div>
        <transition name="slide-up">
            <div class="menu-wrapper" :class="{'hide-box-shadow': !menuVisible || settingVisible >= 0}" v-show="menuVisible">
                <div class="icon-wrapper">
                    <span class="icon-menu" @click="showSetting(3)"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="icon-progress" @click="showSetting(2)"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="icon-bright" @click="showSetting(1)"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="icon-A" @click="showSetting(0)"></span>
                </div>
            </div>
        </transition>
        <ebook-setting-font/>
        <ebook-setting-font-popup />
        <ebook-setting-theme />
        <ebook-setting-progress />
        <ebook-slide />
    </div>
</template>

<script>
    import {ebookMixin} from '../../utils/mixin'
    import EbookSettingFont from './ebook-setting-font'
    import EbookSettingFontPopup from './ebook-setting-font-popup'
    import EbookSettingTheme from './ebook-setting-theme'
    import EbookSettingProgress from './ebook-setting-progress'
    import EbookSlide from './ebook-slide'

    export default {
        name: 'EbookMenu',
        components: {
            EbookSettingFont,
            EbookSettingFontPopup,
            EbookSettingTheme,
            EbookSettingProgress,
            EbookSlide,
        },
        mixins: [ebookMixin],
        data() {
            return {}
        },
        mounted() {
        },
        methods: {
            showSetting(key) {
                this.setSettingVisible(key)
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import '../../assets/styles/global';

    .menu-wrapper {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 200;
        display: flex;
        width: 100%;
        height: px2rem(48);
        background: white;
        box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
        font-size: px2rem(20);

        &.hide-box-shadow {
            box-shadow: none;
        }

        .icon-wrapper {
            flex: 1;
            @include center;
        }
    }

</style>
