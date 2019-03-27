<template>
    <div class="scroll-wrapper" :class="{ 'no-scroll': ifNoScroll }" @scroll.passive="handleScroll" ref="scrollWrapper">
        <slot/>
    </div>
</template>

<script>
    import {realPx} from '../../utils/utils'

    export default {
        name: "Scroll",
        props: {
            top: {
                type: Number,
                default: 0,
            },
            bottom: {
                type: Number,
                default: 0,
            },
            ifNoScroll: {
                type: Boolean,
                default: false,
            }
        },
        methods: {
            handleScroll(e) {
                const offsetY = e.target.scrollTop || pageYOffset || document.body.scrollTop
                this.$emit('onScroll', offsetY)
            },
            scrollTo(x, y) {
                this.$refs.scrollWrapper.scrollTo(x, y)
            },
            refresh() {
                if (this.$refs.scrollWrapper) {
                    this.$refs.scrollWrapper.style.height = innerHeight - realPx(this.top) - realPx(this.bottom) + 'px'
                }
            }
        },
        mounted() {
            this.refresh()

        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/global";

    .scroll-wrapper {
        position: relative;
        z-index: 100;
        width: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch; /*解决移动端卡顿问题*/
        &::-webkit-scrollbar {/*滚动条整体样式*/
            display: none;
        }

        &.no-scroll {
            overflow: hidden;
        }
    }
</style>
