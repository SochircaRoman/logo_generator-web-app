<template>
  
  <main class="about">
    
      <section class="about__content">
        <div class="wrapper">

          <h1 class="about__content-title">About this project</h1>

          <div class="about__content-container">
            <p class="about__content-text">
              Logo design is a creative field.
              A good logo is not only illustrative of the brand but simple enough to be legible from afar.
              It must also be unique enough to not be confused with the myriad of symbols and icons that surround us.
            </p>
          </div>

          <div class="about__content-container">
            <p class="about__content-text">
              Logos are essentially abstract illustrations, but clearly not all illustrations make for good logos.
              In order to create logos systematically we need some notion of what makes a logo good in a visual sense.
            </p>
          </div>

          <div class="about__content-logos">
            <span class="about__logos-span"><img class="about__content-logo" src="/categories/logo1.png" alt="logo"></span>
            <span class="about__logos-span"><img class="about__content-logo" src="/categories/logo2.png" alt="logo"></span>
            <span class="about__logos-span"><img class="about__content-logo" src="/categories/logo3.png" alt="logo"></span>
          </div>

          <div class="about__content-container">
            <p class="about__content-text">
              Good logos are also unique.
              Common symbols and shapes don't make for good logos despite being very legible, as they are not brandable.
            </p>
          </div>

          <div class="about__content-container">
            <p class="about__content-text">
              This project uses a new approach to logo creation, namely logo generation using artificial neural networks.
              This approach greatly simplifies and saves time when creating a logotype because the generation takes place automatically thanks to neural networks.
            </p>
          </div>

          <div class="about__btn">
            <btn-item btnName="Generate logo"></btn-item>
          </div>
        </div>
      </section>

      
  </main>  

</template>

<script>
import BtnItem from '../components/UI/btnItem.vue';

export default {
  components: {
    BtnItem,
  },
  data() {
    return {}
  }
}
</script>

<style>
.about__content {
  margin-top: 150px;
  margin-bottom: 80px;
}

.about__content-title {
  text-align: center;
  font-weight: 500;
  font-size: 44px;
  line-height: 60px;
  margin-bottom: 30px;
}

.about__content-container {
  margin: 0 auto;
  max-width: 500px;
  margin-bottom: 50px;
}

.about__content-text {
  font-size: 20px;
}

.about__content-logos {
  text-align: center;
  margin-bottom: 40px;
}

.about__logos-span {
  padding: 20px;
}

.about__content-logo {
  width: 60px;
  height: 60px;
  transition: 0.2s all;
}
.about__content-logo:hover {
  transform: scale(1.1);
}

.about__btn {
  padding-top: 50px;
  margin: 0 auto;
  width: 200px;
}
</style>