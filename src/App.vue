<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  let html
    , handleFontSize = () => {
    let fontSize = innerWidth / 10
    const MAX_SIZE = 50
    html.style.fontSize = fontSize > MAX_SIZE ? MAX_SIZE : fontSize + 'px'
  }
  document.addEventListener('DOMContentLoaded', () => {
    html = document.querySelector('html')
    handleFontSize()
  })

  window.onresize = handleFontSize


  export default {
  }
</script>
<style>
  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
