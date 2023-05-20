<template>
  
  <main class="logos">

    <loading-item v-if="loading"></loading-item>

    <section class="logos__content">
      <div class="wrapper">

        <div class="logos__top">
          <h1 class="logos__text">Logo gallery storage</h1>
        </div>

        <div class="logos__middle">

          <TransitionGroup>
            <div class="card__wrapper" v-for="item in data" :key="item._id">
              <card-item :link="item.path" :description="item.name" :information="item.size"></card-item>
            </div>
          </TransitionGroup>

          <div v-if="empty" class="empty__content">Empty ):</div>

        </div>

      </div> 
    </section>  

  </main>  

</template>

<script>
import CardItem from '../components/UI/CardItem.vue';
import LoadingItem from "../components/UI/LoadingItem.vue";

export default {
  components: {
    CardItem,
    LoadingItem,
  },
  data() {
    return {
      data: {},
      message: "",
      empty: false,
      successful: false,
      loading: false,
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    currentUserId() {
      return this.$store.state.auth.user._id;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    this.getUserLogos();
  },
  methods: {
    getUserLogos() {
      this.loading = true;
      this.successful = false;

      this.$store.dispatch("users/getUserLogos", {id: this.currentUserId}).then(
        (data) => {
          this.data = data.data.logos
          if (this.data.length === 0) {
            this.empty = true;
          }
          this.successful = true;
          this.loading = false;
        },
        () => {
          this.successful = false;
          this.loading = false;
        }
      )
    },
  },
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
  margin-bottom: 250px;
}

.logos__text {
  font-weight: 500;
  font-size: 44px;
  line-height: 60px;
}

.empty__content {
  text-align: center;
  grid-column: span 3;
  font-weight: 400;
  font-size: 35px;
  line-height: 60px;
}

.card__wrapper {
  
}

.v-enter-from {
  opacity: 0
}
.v-enter-to {
  opacity: 1
}
.v-enter-active {
  transition: opacity 2s ease
}
</style>