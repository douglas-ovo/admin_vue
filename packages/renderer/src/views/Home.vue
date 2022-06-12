<template>
    <div id="home">home</div>
</template>


<script lang="ts">
export default {
    name: "Home"
}
</script>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
</script>


<style lang="less" scoped>
#home {
    height: 100%;
    background: @theme;
}
</style>