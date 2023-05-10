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
  
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color:aliceblue;
  opacity: 0.5;
  width: 100%;
  height: 100%; 
  z-index: 10;
  position: fixed;
  text-align: center;
}

.loading__img {
  margin-top: 200px;
}

</style>