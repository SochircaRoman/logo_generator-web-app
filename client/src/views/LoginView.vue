<template>

  <main class="login">
    <section class="login__content">
      <div class="wrapper">

        <div v-if="loginStatus" class="succes_popup">
          <succes-item text="Succes Login!"></succes-item>
        </div>

        <Form v-else @submit="handleLogin" :validation-schema="schema">

          <div class="login__info">
            <h1 class="login__title">Login</h1>
          </div>
          
          <hr>

          <div class="img_container">
            <img src="png/avatar.png" alt="Avatar" class="profile_img">
          </div>

          <div class="input_container">

            <input-item type="text" name="username" placeholder="Enter Username"></input-item>
            
            <input-item type="password" name="password" placeholder="Enter Password"></input-item>

            <btn-item btnName="Login"></btn-item>

          </div>

          <div class="response">
            <div v-if="message" class="message__respones" role="alert">
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
import * as yup from "yup";

export default {
  name: "Login",
  components: {
    Form,
    InputItem,
    SuccesItem,
    BtnItem,
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
        username: yup.string().min(4).max(this.max).required("Username is required!").label('Username'),
        password: yup.string().min(6).max(this.max).required("Password is required!").label('Password')
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
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.loginStatus = true;
          setTimeout(() => {
            this.$router.push("/profile");
          }, 3000)
        },
        (error) => {
          this.loading = false;
          console.log(error);
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
  margin-bottom: 100px;
}

.wrapper {
  max-width: 400px;
}

.succes_popup {
  margin: 0 auto;
  margin-top: 15%;
}

.login__title {
  text-align: center;
  font-size: 40px;
  line-height: 60px;
}

.img_container {
  text-align: center;
  margin: 24px 0 0px 0px;
}

.profile_img {
  border-radius: 50%;
}

.input_container {
  padding: 16px;
}

.submit_btn {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  font-size: 20px;
}

.submit_btn:hover {
  opacity: 0.8;
}

.response {
  margin: -10px;
  margin-bottom: 20px;
}

.message__respones {
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