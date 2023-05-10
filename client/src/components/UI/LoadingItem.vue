<template>
  <div class="loading">
    <img class="loading__img" src="/gif/loading.gif" alt="loading">
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style>
.loading {
  position: absolute;
  z-index: 1000;
  background-color: white;
  height: 100vh;
  width: 100vh;
  text-align: center;
  line-height: 100vh;
}

.loading__img {
  position: relative;
  margin: auto;
  margin-top: 20%;
}

</style>