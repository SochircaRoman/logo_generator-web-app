<template>
  
  <main class="logos">

    <loading-item v-if="loading"></loading-item>

    <section class="logos__content">
      <div class="wrapper">

        <div class="logos__top">
          <h1 class="logos__text">Logo gallery storage</h1>
        </div>

        <div class="logos__middle">

          <card-item link="/png/logo.png" description="This is a logo description" information="27.1 KB" ></card-item>
          <card-item link="/png/logo.png" description="This is a logo description" information="27.1 KB" ></card-item>
          <card-item link="/png/logo.png" description="This is a logo description" information="27.1 KB" ></card-item>
          <card-item link="/png/logo.png" description="This is a logo description" information="27.1 KB" ></card-item>

        </div>

      </div> 
    </section>  

  </main>  

</template>

<script>
import CardItem from '../components/UI/CardItem.vue';

export default {
  components: {
    CardItem,
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
.logos__top {
  text-align: center;
  margin-top: 100px;
  margin-bottom: 80px;
}

.logos__middle {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 20px;

  margin-top: 120px;
  margin-bottom: 150px;
}

.logos__text {
  font-weight: 500;
  font-size: 44px;
  line-height: 60px;
}
</style>