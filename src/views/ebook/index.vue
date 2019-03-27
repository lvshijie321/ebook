<template>
    <div class="ebook" ref="ebook">
        <ebook-title />
        <ebook-reader />
        <ebook-menu />
    </div>
</template>

<script>
    import {ebookMixin} from "../../utils/mixin";
    import EbookReader from '../../components/ebook/ebook-reader'
    import EbookTitle from '../../components/ebook/ebook-title'
    import EbookMenu from '../../components/ebook/ebook-menu'
    export default {
        name: "index",
        mixins: [ebookMixin],
        components: {
            EbookReader,
            EbookTitle,
            EbookMenu,
        },
        watch: {
            offsetY(newValue) {
                this.$refs.ebook.style.top = newValue + 'px'
                if (newValue === 0) {
                    this.$refs.ebook.style.transition = 'all .2s linear'
                    setTimeout(() => {
                        this.$refs.ebook.style.transition = ''
                    }, 200)
                }

            }
        },
        mounted(){
        }
    }
</script>

<style lang="scss" scoped>
.ebook {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
</style>
