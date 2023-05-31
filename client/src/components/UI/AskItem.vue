<template>
  <div class="popup">
    <div class="popup__text"></div>
    <div class="popup__btns">
      <button class="positive__btn">Confirm</button>
      <button class="negative__btn">Cancel</button>
    </div>
  </div>
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

.popup {
  margin-top: 200px;
}

.positive__btn {
  background-color: #04AA6D;
  
}
.positive__btn:hover {
  background-color: #038556;
}

.negative__btn {
  background-color: #f44336;
}
.negative__btn:hover {
  background-color: #d32f2f;
}
</style>