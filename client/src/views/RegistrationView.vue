<template>

  <main class="register">
    <section class="register__content">
      <div class="wrapper">

        <Form @submit="handleRegister" :validation-schema="schema">

          <div class="registration__info">
            <h1 class="registration__title">Registration</h1>
          </div>
          
          <hr class="registration__line">
          
          <div class="input_container" v-if="!successful">

            <input-item type="text" name="username" placeholder="Enter Username" description="Username"></input-item>

            <input-item type="email" name="email" placeholder="Enter Email" description="Email"></input-item>

            <input-item type="password" name="password" placeholder="Enter Password" description="Password"></input-item>

            <input-item type="password" name="confirmPassword" placeholder="Confirm Password" description="Confirm Password"></input-item>

            <btn-item btnName="Submit"></btn-item>

          </div>

          <div class="message" v-if="message">
            <div :class="successful ? 'message__success' : 'message__alert'">
              {{ message }}
            </div>
          </div>

          <div class="other_info" v-if="!successful">
            <div class="other_info">
              <p class="other_info-text">By creating an account you agree to our <a href="#" class="other_info-link">Terms & Privacy</a>.</p>
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
import BtnItem from "../components/UI/BtnItem.vue";
import * as yup from "yup";

export default {
  name: "Register",
  components: {
    Form,
    InputItem,
    BtnItem,
  },
  data: () => ({
    successful: false,
    loading: false,
    message: "",
    max: 30,
  }),
  computed: {
    schema() {
      return yup.object({
        username: yup.string().min(4).max(this.max).required("Username is required!").label("Username"),
        email: yup.string().email().required("Email is required!").label("Email"),
        password: yup.string().min(6).max(this.max).required("Password is required!").label("Password"),
        confirmPassword: yup.string().required("Repeat Password!").oneOf([yup.ref("password")], "Passwords do not match")
      })
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.loading = true;
      this.successful = false;

      this.$store.dispatch("auth/register", user).then(
        (data) => {
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
    }
  }
  
};
</script>

<style scoped>
.register__content {
  margin-top: 50px;
  margin-bottom: 100px;
}
.wrapper {
  max-width: 400px;
}

.registration__title {
  text-align: center;
  font-size: 40px;
  line-height: 60px;
}

.input_container {
  padding: 16px;
}

.message {
  margin: -10px;
  margin-bottom: 20px;
}

.other_info-text {
  text-align: center;
  font-size: 20px;
}

.other_info-link {
  color: dodgerblue;
}

</style>