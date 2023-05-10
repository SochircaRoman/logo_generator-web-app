<template>

  <div class="btn__item">
    <button class="submit_btn" :class="red?'red':'green'">
      <span>{{ btnName }}</span>
    </button>
  </div>
  
</template>

<script>
export default {
  props: ["btnName", "red"],
}
</script>

<style>

.submit_btn {
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  font-size: 20px;
  transition: background-color 0.3s ease;
}

.green {
  background-color: #04AA6D;
  
}
.green:hover {
  background-color: #038556;
}

.red {
  background-color: #f44336;
}
.red:hover {
  background-color: #d32f2f;
}



</style>