<template>
  <div class="store-home">
    <search-bar/>
    <scroll ref="scroll" :top="scrollTop" @onScroll="onScroll">
      <div>11111</div>
      <div>11111</div>
      <div>11111</div><div>11111</div>
      <div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div><div>11111</div>

    </scroll>
    <flap-card />
  </div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar'
  import Scroll from '../../components/common/Scroll'
  import {storeHomeMixin} from "../../utils/mixin";
  import FlapCard from '../../components/home/flap-card'

  export default {
    name: "storeIndex",
    mixins: [storeHomeMixin],
    components: {
      SearchBar,
      Scroll,
      FlapCard,
    },
    data() {
      return {
        scrollTop: 94,
      }
    },
    methods: {
      onScroll(offsetY) {
        this.setOffsetY(offsetY)
        this.scrollTop = offsetY > 0 ? 54 : 94
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .store-home {
    width: 100%;
    height: 100%;
  }
</style>
