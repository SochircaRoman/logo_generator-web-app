<template>

  <main class="login">
    <section class="login__content">
      <div class="wrapper">

        <loading-item v-if="loading"></loading-item>

        <div v-if="loginStatus" class="succes_popup">
          <succes-item title="Succes Login!" text="Please wait while redirecting..."></succes-item>
        </div>

        <Form v-else @submit="handleLogin" :validation-schema="schema">

          <div class="login__info">
            <h1 class="login__title">Login</h1>
          </div>
          
          <hr>

          <div class="img_container">
            <img src="/png/avatar.png" alt="avatar" class="profile_img">
          </div>

          <div class="input_container">

            <input-item type="text" name="username" placeholder="Enter Username" description="Username"></input-item>
            
            <input-item type="password" name="password" placeholder="Enter Password" description="Password"></input-item>

            <btn-item btnName="Login"></btn-item>

          </div>

          <div class="response">
            <div v-if="message" class="message__response" role="alert">
              {{ message }}
            </div>
          </div>

          <div class="other">
            <div class="other_info">
              <a href="/register" class="other_info-link">Registration?</a>
            </div>
            <div class="other_info">
              Forgot <a href="#" class="other_info-link">password?</a>
            </div>
          </div>

        </Form>

      </div>
    </section>
  </main>

  
</template>

<script>
import { Form } from "vee-validate";
import InputItem from "../components/UI/InputItem.vue";
import SuccesItem from "../components/UI/SuccesItem.vue";
import BtnItem from "../components/UI/BtnItem.vue"
import LoadingItem from "../components/UI/LoadingItem.vue";
import * as yup from "yup";

export default {
  name: "Login",
  components: {
    Form,
    InputItem,
    SuccesItem,
    BtnItem,
    LoadingItem,
  },
  data: () => ({
    loading: false,
    loginStatus: false, 
    message: "",
    max: 30,
  }),
  computed: {
    schema() {
      return yup.object({
        username: yup.string().trim().min(4).max(this.max).required("Username is required!").label('Username'),
        password: yup.string().trim().min(6).max(this.max).required("Password is required!").label('Password')
      })
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin(user) {

      user.username = user.username.replace(/[^A-Z0-9]+/ig, "");
      if (!user.username || (user.username.length > 30 || user.username.length < 4)) {
        this.message = "Please enter a valid username!";
        return false
      }

      this.loading = true;
      this.successful = false;

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.loading = false;
          this.successful = true;
          this.loginStatus = true;
          setTimeout(() => {
            this.$router.push("/profile");
          }, 3000)
        },
        (error) => {
          this.loading = false;
          this.message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        }
      )
    }
  }
  
};
</script>

<style scoped>
.login__content {
  margin-top: 50px;
  margin-bottom: 120px;
}

.wrapper {
  max-width: 400px;
}

.succes_popup {
  margin: 0 auto;
  margin-top: 35%;
  margin-bottom: 300px;
}

.login__title {
  text-align: center;
  font-size: 40px;
  line-height: 60px;
}

.img_container {
  text-align: center;
  margin: 24px 0px 0px 0px;
}

.profile_img {
  border-radius: 50%;
}

.input_container {
  padding: 16px;
}

.response {
  margin: -10px;
  margin-bottom: 20px;
}

.message__response {
  color: #f23648;
  text-align: center;
}

.other {
  min-height: 30px;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  background-color:#f1f1f1;
  font-size: 18px;
}

.other_info-link {
  text-decoration: none;
}

</style>