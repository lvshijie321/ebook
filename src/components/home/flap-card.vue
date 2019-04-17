<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible">
    <div class="flap-card-bg" :class="{ animation: runFlapCardAnimation }">
      <div class="flap-card" v-for="(item, index) in flapCardList" :key="index" :style="{ zIndex: item.zIndex}">
        <div class="point-wrapper">
          <div class="point" :class="{animation: runPointAnimation }" v-for="(item, index) in pointList" :key="index"></div>
        </div>
        <div class="flap-card-circle">
          <div class="flap-card-semi-circle flap-card-semi-circle-left" :style="semiCircleStyle(item, 'left')"
               ref="left"></div>
          <div class="flap-card-semi-circle flap-card-semi-circle-right" :style="semiCircleStyle(item, 'right')"
               ref="right"></div>
        </div>
      </div>
    </div>
    <div class="close-btn-wrapper" @click="close">
      <div class="icon-close"></div>
    </div>
  </div>
</template>

<script>
  import {storeHomeMixin} from "../../utils/mixin";
  import {flapCardList} from "../../utils/store";

  export default {
    name: "flap-card",
    mixins: [storeHomeMixin],
    props: {
      data: Object
    },
    data() {
      return {
        flapCardList,
        front: 0,
        back: 1,
        timestamp: 50,
        runFlapCardAnimation: false,
        pointList: [],
        runPointAnimation: false,
      }
    },
    methods: {
      createPoints() {
        Array.from({length: 18}).forEach((item, index) => {
          this.pointList.push(`point${index}`)
        })
      },
      close() {
        this.setFlapCardVisible(false)
      },
      semiCircleStyle(item, dir) {

        return {
          backgroundColor: `rgb(${item.r},${item.g}, ${item.b})`,
          backgroundSize: item.backgroundSize,
          backgroundImage: dir === 'left' ? item.imgLeft : item.imgRight
        }
      },
      flapCardRotate() {
        const frontFlapCard = this.flapCardList[this.front]
        const backFlapCard = this.flapCardList[this.back]
        frontFlapCard.rotateDegree += 10
        frontFlapCard._g -= 5
        backFlapCard.rotateDegree -= 10
        backFlapCard._g += 5
        if (frontFlapCard.rotateDegree === 90 && backFlapCard.rotateDegree === 90) {

          backFlapCard.zIndex = frontFlapCard.zIndex + 1
        }
        this.rotate(this.front, 'front')
        this.rotate(this.back, 'back')
        if (frontFlapCard.rotateDegree === 180 && backFlapCard.rotateDegree === 0) {
          this.next()
        }
      },
      /**
       * 当正面转了 180° 来到背面，反面（一开始转了 180°）回到正面
       */
      next() {

        let frontFlapCard = this.flapCardList[this.front]
        let backFlapCard = this.flapCardList[this.back]
        frontFlapCard.rotateDegree = 0
        frontFlapCard._g = frontFlapCard.g
        backFlapCard.rotateDegree = 0
        backFlapCard._g = backFlapCard.g
        this.rotate(this.front, 'front')
        this.rotate(this.back, 'back')
        this.front++
        this.back++
        if (this.front >= this.flapCardList.length) {

          this.front = 0
          this._flag = true
        }
        if (this.back >= this.flapCardList.length) {

          this.flapCardList[0].zIndex = this.flapCardList[this.back - 1].zIndex

          this.back = 0
        } else {
          this.flapCardList[this.back].zIndex = this.flapCardList[this.front >= 1 ? this.front - 1 : this.flapCardList.length - 1].zIndex
          if(this._flag) {

            this.flapCardList[this.flapCardList.length - 1].zIndex = 0
            this._flag = false
          }

        }
        this.rotate(this.back, 'front')

        this.prepare()

      },
      rotate(index, type) {
        const item = this.flapCardList[index]
        let dom
        if (type === 'front') {
          dom = this.$refs.right[index]
        } else {
          dom = this.$refs.left[index]
        }
        dom.style.transform = `rotateY(${item.rotateDegree}deg)`
        dom.style.backgroundColor = `rgb(${item.r}, ${item._g}, ${item.b})`
      },
      prepare() {
        const backFlapCard = this.flapCardList[this.back]
        backFlapCard.rotateDegree = 180
        backFlapCard._g = backFlapCard.g - 5 * 18
        this.rotate(this.back, 'back')
      },
      startFlapCardAnimation() {
        this.runFlapCardAnimation = true
        setTimeout(() => this.runPointAnimation = false, 750)


        setTimeout(() => {
          this.runFlapCardAnimation = false
          this.stopFlapCardAnimation()
        }, 2500)
        setTimeout(() => {
          this.runPointAnimation = true

          this.prepare()
          this._timer = setInterval(() => {
            this.flapCardRotate()
          }, this.timestamp)
        }, 300)
      },
      stopFlapCardAnimation() {
        clearInterval(this._timer)
        this.front = 0
        this.back = 1
        this.flapCardList.forEach(item => {
          item.zIndex = item._zIndex
          item.rotateDegree = 0
          item._g = item.g
        })
      }
    }
    ,
    created() {
      this.createPoints()
    },
    watch: {
      flapCardVisible(newValue) {
        newValue
          ? this.startFlapCardAnimation()
          : this.stopFlapCardAnimation()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "../../assets/styles/flapCard";
  .flap-card-wrapper {
    @include absCenter;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .6);
    @include center;

    .flap-card-bg {
      position: relative;
      width: px2rem(64);
      height: px2rem(64);
      border-radius: px2rem(5);
      background: #ffffff;
      transform: scale(0);
      opacity: 0;
      &.animation {
        animation: flap-card-move .3s ease-in both;
      }
      @keyframes flap-card-move {
        0% {
          transform: scale(0);
          opacity: 0;
        }
        50% {
          transform: scale(1.2);
          opacity: 1;
        }
        75% {
          transform: scale(.9);
          opacity: 1;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      .flap-card {
        width: px2rem(48);
        height: px2rem(48);
        @include absCenter;

        .flap-card-circle {
          display: flex;
          width: 100%;
          height: 100%;

          .flap-card-semi-circle {
            flex: 0 0 50%;
            height: 100%;
            width: 50%;
            background-repeat: no-repeat;
            backface-visibility: hidden;
          }

          .flap-card-semi-circle-left {
            border-radius: px2rem(24) 0 0 px2rem(24);
            background-position: center right;
            transform-origin: right;
          }

          .flap-card-semi-circle-right {
            border-radius: 0 px2rem(24) px2rem(24) 0;
            background-position: center left;
            transform-origin: left;
          }
        }
      }
      .point-wrapper {
        z-index: 1500;
        @include absCenter;
        .point {
          border-radius: 50%;
          @include absCenter;
          &.animation {
            @for $i from 1 to length($moves) {
              &:nth-child(#{$i}) {
                @include move($i);
              }
            }
          }
        }
      }
    }

    .close-btn-wrapper {
      position: absolute;
      left: 0;
      bottom: px2rem(30);
      z-index: 1100;
      width: 100%;
      @include center;

      .icon-close {
        width: px2rem(45);
        height: px2rem(45);
        border-radius: 50%;
        background-color: #333;
        font-size: px2rem(25);
        @include center;
        color: #ffffff;
      }
    }
  }
</style>
