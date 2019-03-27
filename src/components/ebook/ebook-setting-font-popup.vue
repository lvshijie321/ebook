<template>
    <transition name="popup-slide-up">
        <div class="ebook-popup-list" v-show="fontFamilyVisible">
            <div class="ebook-popup-title">
                <div class="ebook-popup-title-icon" @click="hide">
                    <span class="icon-down2"></span>
                </div>
                <span class="ebook-popup-title-text">{{$t('book.selectFont')}}</span>
            </div>
            <div class="ebook-popup-list-wrapper">
                <div class="ebook-popup-item" v-for="(item, index) in fontFamilyList" :key="index" @click="onClickFontFamily(item)">
                    <div class="ebook-popup-item-text" :class="{selected: isSelected(item)}">{{item.font}}</div>
                    <div class="ebook-popup-item-check">
                        <span class="icon-check" v-show="isSelected(item)"></span>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {ebookMixin} from "../../utils/mixin";
    import {FONT_FAMILY} from '../../utils/book'
    import * as localStorage from '../../utils/localStorage'

    export default {
        name: "EbookSettingFontPopup",
        mixins: [ebookMixin],
        data() {
            return {
                fontFamilyList: FONT_FAMILY
            }
        },
        methods: {
            hide() {
                this.setFontFamilyVisible(false)
            },
            isSelected(item) {
                return this.defaultFontFamily === item.font
            },
            onClickFontFamily(item) {
                const font = item.font === 'Default' ? 'Times New Roman' : item.font
                this.setDefaultFontFamily(font)
                this.rendition.themes.font(font)
                localStorage.setLocalStorage('font_family',{
                    [this.fileName]: font
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/global";

    .ebook-popup-list {
        background: white;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 350;
        width: 100%;
        font-size: 0;
        box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, .1);

        .ebook-popup-title {
            position: relative;
            text-align: center;
            padding: px2rem(15);
            border-bottom: px2rem(1) solid #b8b9bb;
            box-sizing: border-box;
            @include center;

            .ebook-popup-title-text {
                font-size: px2rem(14);
                font-weight: bold;
            }

            .ebook-popup-title-icon {
                position: absolute;
                left: px2rem(15);
                top: 0;
                height: 100%;
                @include center;

                .icon-down2 {
                    font-size: px2rem(16);
                    font-weight: bold;
                }
            }
        }
        .ebook-popup-list-wrapper {
            .ebook-popup-item {
                display: flex;
                padding: px2rem(15);
                .ebook-popup-item-text {
                    flex:1;
                    font-size: px2rem(14);
                    text-align: left;
                    &.selected {
                        color: #346cb9;
                        font-weight: bold;
                    }
                }
                .ebook-popup-item-check {
                    flex: 1;
                    text-align: right;
                    .icon-check {
                        font-size: px2rem(14);
                        font-weight: bold;
                        color: #346cb9;
                    }
                }
            }
        }

    }
</style>
