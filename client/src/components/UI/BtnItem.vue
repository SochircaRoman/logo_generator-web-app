<template>

  <div class="btn__item">
    <button class="submit_btn">
      <span>{{ btnName }}</span>
    </button>
  </div>
  
</template>

<script>
export default {
  props: ["btnName"]
}
</script>

<style>

.submit_btn {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  font-size: 20px;
}

.submit_btn:hover {
  opacity: 0.8;
}

</style>