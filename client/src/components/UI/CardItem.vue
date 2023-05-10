<template>
  
  <div class="logo__card">
 
    <div class="card__img-wrapper">
      <img :src="link"  alt="logo" class="img">
      <div class="img__description">{{ description }}</div>
    </div>

    <div class="card__information">
      <div class="information">{{ information }}</div>
    </div>

    <hr class="card__line">

    <div class="card__btns">
      <btn-item btnName="Download" class="btn"></btn-item>
      <btn-item btnName="Delete" :red="true" class="btn"></btn-item>
    </div>

  </div>

  <div class="card__item">

  </div>

</template>

<script>
import BtnItem from '../UI/BtnItem.vue';

export default {
  components: {
    BtnItem,
  },
  props: ["link", "description", "information"],
}
</script>

<style>
.logo__card {
  max-width: 200px;
  max-height: 200px;
}
.card__img-wrapper {
  text-align: center;
}

.card__btns {
  display: inline;
}

.btn {
  display: inline-block;
}
.card__btns-btn:hover {
  opacity: 0.8;
}

.download {
  background-color: #04AA6D;
}
.delete {
  background-color: red;
}
</style>