<template>
    <transition name="slide-up">
        <div class="setting-wrapper" v-show="menuVisible && settingVisible === 2">
            <div class="setting-progress">
                <div class="read-time-wrapper">
                    <span class="read-time-text">11</span>
                    <span class="icon-forward"></span>
                </div>
                <div class="progress-wrapper">
                    <div class="progress-icon-wrapper" @click="prevSection">
                        <span class="icon-back"></span>
                    </div>
                    <input class="progress" type="range"
                           max="100"
                           min="0"
                           step="1"
                           @change="onProgressChange($event.target.value)" @input="onProgressInput($event.target.value)"
                           :value="progress"
                           :disabled="!bookAvailable"
                           ref="progress">
                    <div class="progress-icon-wrapper" @click="nextSection">
                        <span class="icon-forward"></span>
                    </div>
                </div>
                <div class="text-wrapper">
                    <span class="progress-section-text">{{getSection}}</span>
                    <span>{{bookAvailable ? `(${progress}%)` : '加载中...'}}</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {ebookMixin} from "../../utils/mixin";
    import { diaplaySection, refreshLocation} from "../../utils/book"

    export default {
        name: "EbookSettingProgress",
        mixins: [ebookMixin],
        data() {
            return {
                _progress: 0,
            }
        },
        computed: {
            getSection() {
                // if (this.section) {
                //     const sectionInfo = this.book.section(this.section)
                //     return sectionInfo && sectionInfo.href && this.book.navigation.get(sectionInfo.href) ? this.book.navigation.get(sectionInfo.href).label : ''
                // }
                // return ''
                return this.section
                        ? this.navigation[this.section]
                            ? this.navigation[this.section].label
                            : ''
                        : ''
            }
        },
        updated() {
            this.updateProcess()
        },
        methods: {
            onProgressChange(progress) {
                this.setProgress(progress).then(() => {
                    this.displayProcess()
                })
            },
            onProgressInput(progress) {
                this.setProgress(progress)
            },
            updateProcess() {
                this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
            },
            // diaplaySection() {
            //     const section = this.book.section(this.section)
            //     section .href && this.rendition.display(section.href).then(() => refreshLocation.call(this))
            // },
            // refreshLocation() {
            //     setTimeout(() => {
            //         const currentLocation = this.book.rendition.currentLocation()
            //
            //         currentLocation.start && (this._progress = Math.floor(this.book.locations.percentageFromCfi(currentLocation.start.cfi) * 100))
            //         this.setProgress(this._progress)
            //     }, 100)
            //
            //
            // },
            nextSection() {

                this.section < this.book.spine.length - 1 && this.bookAvailable && this.setSection(this.section + 1)
                    .then(() => {
                            diaplaySection.call(this)
                        }
                    )
            },
            prevSection() {
                this.section && this.bookAvailable && this.setSection(this.section - 1)
                    .then(() => {
                        diaplaySection.call(this)
                        }
                    )

            },
            displayProcess() {
                this.rendition.display(this.book.locations.cfiFromPercentage(this.progress / 100)).then(() => {
                    refreshLocation.call(this)
                })
            },
        },

    }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/global.scss";


    .setting-wrapper {
        position: absolute;
        bottom: px2rem(48);
        left: 0;
        z-index: 101;
        width: 100%;
        height: px2rem(90);
        background: white;
        box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);

        .setting-progress {
            position: relative;
            width: 100%;
            height: 100%;

            .read-time-wrapper {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                font-size: px2rem(12);
                height: px2rem(40);
                @include center;
            }

            .progress-wrapper {
                width: 100%;
                height: 100%;
                @include center;
                padding: 0 px2rem(15);
                box-sizing: border-box;

                .progress-icon-wrapper {
                    font-size: px2rem(20);
                }

                .progress {
                    width: 100%;
                    -webkit-appearance: none;
                    height: px2rem(2);
                    background: -webkit-linear-gradient(#999, #999) no-repeat, #search;
                    margin: 0 px2rem(10);

                    &
                    :focus {
                        outline: none;
                    }

                    &
                    ::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        height: px2rem(20);
                        width: px2rem(20);
                        border-radius: 50%;
                        background: white;
                        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .15);
                        border: px2rem(1) solid #search;
                    }

                }
            }

            .text-wrapper {
                position: absolute;
                left: 0;
                bottom: px2rem(10);
                width: 100%;
                color: #333;
                font-size: px2rem(12);
                @include center;    
                padding: 0 px2rem(15);
                box-sizing: border-box;
                .progress-section-text {
                    @include ellipsis;
                }
            }

        }
    }
</style>
