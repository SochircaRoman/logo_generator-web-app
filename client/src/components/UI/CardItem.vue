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
    downloadLogo() {
      this.loading = true;
      this.successful = false;

      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = () => {
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(xhr.response);
        const link = document.createElement("a");
        link.href = imageUrl;
        link.setAttribute("download", this.description);
        link.setAttribute("target", "new");
        document.body.appendChild(link);
        link.click();
      };
      xhr.open("GET", this.link);
      xhr.send();

      this.successful = true;
      this.loading = false;
    },
    deleteLogo() {
      this.loading = true;
      this.successful = false;

      this.$store.dispatch("logos/deleteLogo", {id: this.id, logo: this.description}).then(
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
  border-radius: 10px;
  box-shadow: 0px 0px 10px gray;
  padding: 1px;
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

.card__btns {
  display: flex;
  justify-content: space-around;
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