<template>
  <div id="app">
    <router-view/>
	</div>
</template>

<script>

export default {
  name: 'app',
};

</script>

<style lang="sass">
    @import 'node_modules/bootstrap/scss/bootstrap'
    @import 'node_modules/bootstrap-vue/src/index.scss'
    @import "./assets/style/main.sass"
</style>