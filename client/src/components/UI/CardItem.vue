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
      <button class="card__btns-btn download">Download</button>
      <button class="card__btns-btn delete">Delete</button>
    </div>

  </div>

  <div class="card__item">

  </div>

</template>

<script>
export default {
  props: ["btnName", "link", "information", ]
}
</script>

<style>


.card__btns-btn {
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  font-size: 20px;
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