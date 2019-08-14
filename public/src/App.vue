<template>
<div id="app">
  <router-view />
</div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {}
  }
}
</script>

<style lang="scss">
* {
    box-sizing: border-box;
}

.index{
  width: 100%;
}

.ul {
    width: 100%;
    list-style: none;
    padding: 0;
}
</style>
