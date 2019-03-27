<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  let html
    , handleFontSize = () => html.style.fontSize = innerWidth / 10 + 'px'
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
