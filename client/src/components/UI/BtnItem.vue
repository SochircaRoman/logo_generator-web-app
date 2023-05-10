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
}

.green {
  background-color: #04AA6D;
}

.red {
  background-color: red;
}

.submit_btn:hover {
  opacity: 0.8;
}

</style>