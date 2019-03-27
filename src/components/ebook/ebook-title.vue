<template>
    <transition name="slide-down">
        <div class="title-wrapper" v-show="menuVisible">
            <div class="left">
                <span class="icon-back"></span>
            </div>
            <div class="right">
                <div class="icon-wrapper">
                    <span class="icon-cart"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="icon-person"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="icon-more"></span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

    import {ebookMixin} from '../../utils/mixin'
    export default {
        name: 'EbookTitle',
        mixins: [ebookMixin],
        data() {
            return {}
        },
        mounted() {

        },
        methods: {

        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import '../../assets/styles/global';
    .title-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 101;
        display: flex;
        width: 100%;
        height: px2rem(48);
        background: white;
        box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15);
        .left {
            flex: 0 0 px2rem(60);
            @include center;
            font-size: px2rem(22);
        }
        .right {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            .icon-wrapper {
                flex: 0 0 px2rem(40);
                @include center;
            }
            div>span{
                font-size: px2rem(22);
            }
        }
    }
</style>
