<template>
    <div class="ebook-loading">
        <div class="ebook-loading-wrapper">
            <div class="ebook-loading-item" v-for="(item, index) in data" :key="index">
                <div class="ebook-loading-line-wrapper" v-for="(subItem, subIndex) in item" :key="subIndex">
                    <div class="ebook-loading-line" ref="line"></div>
                    <div class="ebook-loading-mask" ref="mask"></div>
                </div>
            </div>
            <div class="ebook-loading-center"></div>
        </div>
    </div>
</template>

<script>
    import {px2rem} from "../../utils/utils";

    export default {
        name: "ebook-loading",
        data() {
            return {
                data: [
                    [{}, {}, {}],
                    [{}, {}, {}],
                ],
                maskWidth: [
                    {
                        value: 0,
                    },
                    {
                        value: 0,
                    },
                    {
                        value: 0,
                    },
                    {
                        value: 0,
                    },
                    {
                        value: 0,
                    },
                    {
                        value: 0,
                    },
                ],
                lineWidth: [

                    {
                        value: 16,
                    },
                    {
                        value: 16,
                    },
                    {
                        value: 16,
                    },
                    {
                        value: 16,
                    },
                    {
                        value: 16,
                    },
                    {
                        value: 16,
                    },
                ],
                add: true,
                end: false,
            }
        },
        beforeDestroy() {
            this.clearAnimation()
        },
        methods: {
            clearAnimation() {
                clearInterval(this.task)
            },
            genAnimation() {
                this.task = setInterval(() => {
                    this.$refs.mask.forEach((item, index) => {
                        const mask = this.$refs.mask[index]
                            , line = this.$refs.line[index]
                        let maskWidth
                            , lineWith
                        if (index === 0) {

                            if (this.add && this.maskWidth[index].value < 16) {
                                maskWidth = ++this.maskWidth[index].value
                                lineWith = --this.lineWidth[index].value
                            } else if (!this.add &&  this.lineWidth[index].value < 16) {
                                maskWidth = --this.maskWidth[index].value
                                lineWith = ++this.lineWidth[index].value
                            }
                        } else {
                            if (this.add && this.maskWidth[index].value < 16) {
                                const prevMaskWidth = this.maskWidth[index - 1].value
                                if (prevMaskWidth >= 8) {
                                    maskWidth = ++this.maskWidth[index].value
                                    lineWith = --this.lineWidth[index].value
                                }
                            } else if (!this.add &&  this.lineWidth[index].value < 16) {
                                const prevLineWidth = this.lineWidth[index - 1].value
                                if (prevLineWidth >=8) {
                                    maskWidth = --this.maskWidth[index].value
                                    lineWith = ++this.lineWidth[index].value
                                }
                            }
                        }
                        mask.style.width = px2rem(maskWidth)
                        mask.style.flex = `0 0 ${px2rem(maskWidth)}`
                        line.style.width = px2rem(lineWith)
                        line.style.flex = `0 0 ${px2rem(lineWith)}`
                        if (index === this.$refs.mask.length - 1) {
                            if (this.add && this.maskWidth[index].value === 16) {
                                this.end = true
                            } else if (!this.add && this.maskWidth[index].value === 0) {
                                this.end = true
                            }
                        }
                        if (this.end) {
                            this.end = false
                            this.add = !this.add
                        }
                    })
                }, 20)
            },
        },
        mounted() {
            this.genAnimation()
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/global.scss";

    .ebook-loading {
        position: relative;
        z-index: 400;
        width: px2rem(63);
        height: px2rem(40);
        background: transparent;
        border: px2rem(1.5) solid #d7d7d7;
        border-radius: px2rem(3);

        .ebook-loading-wrapper {
            display: flex;
            width: 100%;
            height: 100%;

            .ebook-loading-item {
                flex: 1;
                display: flex;
                flex-direction: column;
                padding: px2rem(7) 0;

                .ebook-loading-line-wrapper {
                    flex: 1;
                    @include left;
                    padding: 0 px2rem(7);
                    box-sizing: border-box;

                    .ebook-loading-line {
                        flex: 0 0 px2rem(6);
                        width: px2rem(6);
                        height: px2rem(2);
                        background: #d7d7d7;
                    }

                    .ebook-loading-mask {
                        flex: 0 0 px2rem(10);
                        width: px2rem(10);
                        height: px2rem(2);
                    }
                }
            }

            .ebook-loading-center {
                position: absolute;
                left: 50%;
                top: 0;
                width: px2rem(1.5);
                height: 100%;
                background: #d7d7d7;
            }
        }
    }
</style>
