<template>
    <transition name="fade">
        <div class="slide-content-wrapper" v-show="menuVisible && settingVisible === 3">
           22
        </div>
    </transition>
</template>

<script>
    import {ebookMixin} from "../../utils/mixin";

    export default {
        name: "ebook-slide-bookmark",
        mixins: [ebookMixin],
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/global";

</style>
