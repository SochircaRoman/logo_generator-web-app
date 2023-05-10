<template>
  
  <main class="generator">

    <loading-item v-if="loading"></loading-item>
    
    <section class="generator__top">
      <div class="wrapper">
        <h1 class="generator_text">Generate your own logo!</h1>
      </div>
    </section>

    <section class="generator__middle">
      <div class="generator_panel">

        <div class="canvas_wrapper" id="canvas_wrapper">
          <canvas id="the_canvas">
            Your browser does not support the canvas element.
          </canvas>
        </div>

        <div class="generator__btn noselect">
          <btn-item @click="generate" btnName="Generate" class="btn"></btn-item>
          <a :href="logoLink" download="generated_logo.png">
            <btn-item @click="download" btnName="Download" class="btn"></btn-item>
          </a>
        </div>

      </div>
    </section> 
      
  </main>  

</template>

<script>
import * as tf from '@tensorflow/tfjs';
import BtnItem from '../components/UI/BtnItem.vue';
import LoadingItem from "../components/UI/LoadingItem.vue";

export default {
  components: {
    BtnItem,
    LoadingItem,
  },
  data() {
    return {
      logoLink: null,
      generatedLogo: false,
      successful: false,
      loading: false,
    }
  },
  methods: {
    generate() {
      this.message = "";
      this.loading = true;
      this.successful = false;

      this.$store.dispatch("users/generateLogo").then(
        (data) => {
          const canvas = document.getElementById("the_canvas");
          canvas.width = data.shape[0];
          canvas.height = data.shape[1];
          tf.browser.toPixels(data, canvas);
          
          this.generatedLogo = true;
          this.message = data.message;
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          this.successful = false;
          this.loading = false;
        }
      )
    },
    download() {
      if (this.generatedLogo) {
        this.logoLink = document.getElementById('the_canvas').toDataURL("image/png");
      }
    }
  }
}
</script>

<style>
.generator__top {
  text-align: center;
  margin-top: 100px;
  margin-bottom: 80px;
}

.generator__middle {
  margin-top: 120px;
  margin-bottom: 150px;
}

.generator_text {
  font-weight: 500;
  font-size: 44px;
  line-height: 60px;
}

.generator_panel {
    margin: 0 auto;
    max-width: 800px;
    text-align: center;
    padding: 100px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}

.canvas_wrapper {
    width: 64px;
    height: 64px;
    position: relative;
    outline: 3px dashed #ddd;
    margin: 0 auto 40px auto;
}

.btn {
  display: inline-block;
  margin: 20px 15px 0px 15px;
}

.generator__btn {
  display: inline;
  padding-top: 50px;
  margin: 0 auto;
  width: 200px;
}
</style>