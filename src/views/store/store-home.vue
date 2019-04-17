<template>
  <div class="store-home">
    <search-bar/>
    <scroll ref="scroll" :top="scrollTop" @onScroll="onScroll">

    </scroll>
    <flap-card :data="random"/>
  </div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar'
  import Scroll from '../../components/common/Scroll'
  import {storeHomeMixin} from "../../utils/mixin";
  import FlapCard from '../../components/home/flap-card'
  import {home} from "../../api/store";

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
        random: null,
      }
    },
    mounted() {
      home().then(res => {
        if(res && res.status == '200') {
          const randomIndex = Math.floor(Math.random() * res.data.random.length)
          this.random = res.data.random[randomIndex]
        }
      }).catch(err => {
        debugger
      })
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
