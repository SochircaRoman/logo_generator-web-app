<template>

  <div class="container">
    <div class="top">
      <div class="top__content">
        <img src="/png/succes.png" alt="SUCCES">
        <h3 v-if="text" class="top__text"> {{ text }}</h3>
        <h3 v-else class="top__text">Succes!</h3>
      </div>
    </div>
    <div class="bottom">
      <p class="bottom__text">Please wait while redirecting...</p>
    </div>
  </div>

</template>

<script>

export default {
  props: ["text"]
}
</script>

<style>
.container {
  margin: 0 auto;
  margin-top: 35%;
  width: 300px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px gray;
  text-align: center;
}

.top {
  background-color: #333;
  color: white;
  border-radius: 10px 10px 0px 0px;
  padding: 25px;
}

.top__text {
  font-size: 30px;
  font-weight: 600;
  margin-top: 20px;
}

.bottom__text {
  font-size: 20px;
  font-weight: 400;
  padding: 30px 0px;
  color:#333;
}

</style>