<template>
  <main class="activation">

    <section class="activation__content">
      <div class="wrapper">

        <div v-if="currentUser['isActivated'] === false" class="activation__content-information">
          <h2 class="information__text">Please activate your account via the link sent to your email address: <strong class="bold">{{ currentUser['email'] }}</strong></h2>
          <router-link to="/home" class="noselect">
            <btn-item class="information__btn" btnName="Back to home"></btn-item>
          </router-link>
        </div>

        <succes-item v-else title="Succes Activation!" text="Your account has been successfully activated">
          <div class="activation__content-btn">
            <router-link to="/login" class="noselect">
              <btn-item btnName="To login"></btn-item>
            </router-link>
          </div>
        </succes-item>

      </div>
    </section>

  </main>
</template>

<script>
import SuccesItem from "../components/UI/SuccesItem.vue";
import BtnItem from '../components/UI/BtnItem.vue';

export default {
  components: {
    SuccesItem,
    BtnItem,
  },
  computed: {
    currentUser() {
      if (this.$store.state.auth.user === null) {
        return false
      }
      return this.$store.state.auth.user;
    },
  },
}
</script>

<style scoped>
.container {
  margin-top: 20%;
  width: 400px;
  margin-bottom: 200px;
}

.activation__content-btn {
  max-width: 200px;
  margin: 0 auto;
  padding-bottom: 20px;
}

.activation__content-information {
  background-color: white;
  margin: 0 auto;
  margin-top: 200px;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px gray;
  text-align: center;
  padding: 20px;
  margin-bottom: 300px;
}

.information__text {
  font-size: 20px;
  margin-bottom: 30px;
}

.information__btn {
  width: 200px;
  margin: 0 auto;
}

.bold {
  font-weight: 600;
}

</style>