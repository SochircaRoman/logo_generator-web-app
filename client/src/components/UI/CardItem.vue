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
      <btn-item btnName="Delete" :red="true" class="btn"></btn-item>
      <btn-item btnName="Download" class="btn"></btn-item>
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
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 300px;
  max-height: 200px;
  padding: 20px;
}
.card__img-wrapper {
  text-align: center;
}

.card__btns {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 0;
  margin: 0;
  width: auto;
  font-size: 20px;
}
</style>