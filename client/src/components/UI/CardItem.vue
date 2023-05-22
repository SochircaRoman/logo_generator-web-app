<template>
  
  <div class="logo__card">

    <loading-item v-if="loading"></loading-item>
 
    <div class="card__img-wrapper">
      <img :src="link"  alt="logo" class="img">
      <div class="img__description">{{ description }}</div>
    </div>

    <div class="card__information">
      <div class="information">Size: {{ information }} KB</div>
    </div>

    <hr class="card__line">

    <div class="card__btns">
      <btn-item @click="deleteLogo" btnName="Delete" :red="true" class="btn"></btn-item>
      <btn-item @click="downloadLogo" btnName="Download" class="btn"></btn-item>
    </div>

    <div class="message" v-if="message">
      <div :class="successful ? 'message__success' : 'message__alert'">
        {{ message }}
      </div>
    </div>

  </div>

</template>

<script>
import BtnItem from '../UI/BtnItem.vue';
import LoadingItem from "../UI/LoadingItem.vue";

export default {
  components: {
    BtnItem,
    LoadingItem,
  },
  data() {
    return {
      successful: false,
      loading: false,
      message: "",
    }
  },
  props: ["id", "link", "description", "information"],
  methods: {
    async downloadLogo() {
      const response = await fetch(this.link, {mode : 'no-cors'});
      console.log(response)
      const blob = await response.blob();
      console.log(blob)
      const url = URL.createObjectURL(blob);
      console.log(url)

      Object.assign(document.createElement('a'), { href: url, download: "file" }).click();
      URL.revokeObjectURL(url);
    },
    deleteLogo() {
      this.loading = true;
      this.successful = false;

      console.log(this.id)
      this.$store.dispatch("logos/deleteLogo", {id: this.id}).then(
        (data) => {
          this.message = data.message
          this.successful = true;
          this.loading = false;
          setTimeout(() => {this.$router.go()}, 2000);
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          this.successful = false;
          this.loading = false;
        }
      )
    }
  },
}
</script>

<style>
.logo__card {
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
}

.img {
  margin-bottom: 10px;
}

.card__img-wrapper {
  margin: 15px 0 30px 0;
  text-align: center;
}

.card__line {
  max-width: 90%;
}

.information {
  margin: 0 0 5px 15px;
  font-weight: bold;
}

.img__description {
  font-style: italic;
}

.btn {
  margin: 0 8px 5px 8px;
}

.message__success {
  color: #04AA6D;
}
.message__alert {
  color: #f23648;
}
</style>