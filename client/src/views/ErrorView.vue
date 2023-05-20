<template>
  
  <main>
    <div class="wrapper">
      <div class="error__content">

        <div class="error__content-information">
          <h1 class="error__content-code">404</h1>
          <h2 class="error__content-title">Page Not Found</h2>
          <p class="error__content-text">Oops! The page you requested could not be found...</p>
        </div>


        <div class="error_content-btn">
          <router-link to="/home" class="noselect">
            <btn-item btnName="Back to home"></btn-item>
          </router-link>
        </div>

      </div>
    </div>
  </main>

</template>

<script>
import BtnItem from '../components/UI/BtnItem.vue';

export default {
  components: {
    BtnItem,
  },
}
</script>

<style>

.error__content {
  margin-top: 160px;
  margin-bottom: 200px;
  text-align: center;
}

.error__content-information {
  margin-bottom: 80px;
}

.error__content-code {
  font-weight: 400;
  font-size: 100px;
}

.error__content-title {
  font-size: 25px;
  font-weight: 600;
}

.error__content-text {
  font-size: 20px;
  line-height: 30px;
}

.error_content-btn {
  max-width: 200px;
  margin: 0 auto;
}

</style>