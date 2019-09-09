<template>
<div class="big">
    <!-- 路由出口 -->
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      value1: true,
      value2: true
    }
  }
}
</script>

<style>
.big{
  height: 100%;
}
</style>
