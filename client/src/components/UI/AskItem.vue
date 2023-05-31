<template>
  <div class="popup">
    <div class="popup__content">
      <div class="popup__content-desc">
        <h2 class="title">Delete Account</h2>
        <p class="text">Are you sure to delete your account? This will permanetly delete all your data.</p>
      </div>
      <div class="popup__content-btns">
        <button class="popup__btn positive">Cancel</button>
        <button class="popup__btn negative">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style>
.popup {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color:aliceblue;
  width: 100%;
  height: 100%; 
  z-index: 10;
  position: fixed;
  text-align: center;
}

.popup__content-desc {
  text-align: center;
  margin-bottom: 20px;
  padding: 20px;
}

.title{
  font-weight: 500;
  font-size: 22px;
  line-height: 29px;
  margin-bottom: 10px;
}

.text{

}

.popup__content-btns {
  display: flex;
  justify-content: space-around;
  padding-bottom: 20px;
}

.popup__btn {
  color: white;
  padding: 12px 30px;
  border: none;
  cursor: pointer;
  font-size: 20px;
  transition: background-color 0.3s ease;
}

.popup__content {
  background-color: white;
  margin: 0 auto;
  margin-top: 20%;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px gray;
  text-align: center;
}

.positive {
  background-color: #04AA6D;
  
}
.positive:hover {
  background-color: #038556;
}

.negative {
  background-color: #f44336;
}
.negative:hover {
  background-color: #d32f2f;
}
</style>