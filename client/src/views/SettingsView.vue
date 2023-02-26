<template>

  <main class="settings">
    <section class="settings__content">

      <div class="wrapper">
        <div class="settings__content-container">

          
            <div class="settings__info">
              <h1 class="settings__title">Edit Profile</h1>
            </div>

            <hr>

            <div class="settings__update-container">
              <div class="img_container">
                <img src="png/avatar.png" alt="avatar" class="profile_img">
              </div>
              <btn-item class="settings__upload-btn" btnName="Upload Photo"></btn-item>
              <div class="settings__upload-background">
                <p class="settings__upload-info">Upload a new avatar. Larger image will be resized automatically.</p>
                <p class="settings__upload-info">Maximum upload size is 1 MB</p>
              </div>
            </div>
          
            <Form @submit="updateUsername" :validation-schema="usernameSchema">
              <div class="settings__update-container">
                <div class="profile__information-field">
                  <div class="field__name">Username:</div>
                  <div class="field__data">{{ currentUser.username }}</div>
                </div>
                <input-item class="profile__input-item" type="text" name="newUsername" placeholder="New Username"></input-item>
                <btn-item class="settings__update-btn" btnName="Update Username"></btn-item>
                <div class="message" v-if="message">
                  <div :class="successful ? 'message__success' : 'message__alert'">
                    {{ message }}
                  </div>
                </div>
              </div>
            </Form>

            <Form @submit="updatePassword" :validation-schema="passwordSchema">
              <div class="settings__update-container">
                <div class="profile__information-field">
                  <div class="field__name">Password:</div>
                  <div class="field__data">********</div>
                </div>
                <input-item class="profile__input-item" type="password" name="oldPassword" placeholder="Old Password"></input-item>
                <input-item class="profile__input-item" type="password" name="newPassword" placeholder="New Password"></input-item>
                <btn-item class="settings__update-btn" btnName="Update Password"></btn-item>
                <div class="message" v-if="message">
                  <div :class="successful ? 'message__success' : 'message__alert'">
                    {{ message }}
                  </div>
                </div>
              </div>
            </Form>

            <Form @submit="updateEmail" :validation-schema="emailSchema">
              <div class="settings__update-container">
                <div class="profile__information-field">
                  <div class="field__name">Email:</div>
                  <div class="field__data">{{ currentUser.email }}</div>
                </div>
                <input-item class="profile__input-item" type="text" name="email" placeholder="New Email"></input-item>
                <btn-item class="settings__update-btn" btnName="Update Email"></btn-item>
              </div>
            </Form>

        </div>
      </div>

    </section>
  </main>

</template>

<script>
import BtnItem from "../components/UI/btnItem.vue";
import InputItem from "../components/UI/InputItem.vue";
import { Form } from "vee-validate";
import * as yup from "yup";
export default {
  components: {
    BtnItem,
    InputItem,
    Form,
  },
  data() {
    return {
      successful: false,
      loading: false,
      message: "",
    }
  },
  computed: {
    usernameSchema() {
      return yup.object({
        newUsername: yup.string().min(4).max(30).required("Username is required!").label("Username"),
      })
    },
    passwordSchema() {
      return yup.object({
        oldPassword: yup.string().min(6).max(20).required("Password is required!").label("Password"),
        newPassword: yup.string().min(6).max(20).required("Password is required!").label("Password"),
      })
    },
    emailSchema() {
      return yup.object({
        email: yup.string().email().required("Email is required!").label("Email"),
      })
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    currentUserId() {
      return String(this.$store.state.auth.user._id);
    },
  },
  methods: {
    updateUsername(user) {
      this.message = "";
      this.loading = true;
      this.successful = false;

      this.$store.dispatch("users/updateUsername", {newUsername: user.newUsername, id: this.currentUserId}).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.$router.go();
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          this.successful = false;
          this.loading = false;
        }
      )
    },
    updatePassword(user) {
      this.message = "";
      this.loading = true;
      this.successful = false;

      this.$store.dispatch("users/updatePassword", {oldPassword: user.oldPassword, newPassword: user.newPassword, id: this.currentUserId}).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.$router.go();
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          this.successful = false;
          this.loading = false;
        }
      )
    },
    updateEmail(user) {
      console.log(user);
    }
  },
  mounted () {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.settings__content {
  margin-top: 75px;
  margin-bottom: 150px;
}
.wrapper {
  max-width: 400px;
}

.settings__title {
  text-align: center;
  font-size: 40px;
  line-height: 60px;
}

.img_container {
  text-align: center;
  margin: 24px 0px 15px 0px;
}

.profile_img {
  border-radius: 50%;
}

.settings__update-container {
  margin-bottom: 40px;
}

.settings__upload-background {
  background: rgba(204, 204, 204, 0.304);
  text-align: center;
}

.settings__upload-info {
  padding: 15px 30px;
}

.profile__input-item {
  margin-bottom: -2px;
}

.profile__information-field {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: rgba(204, 204, 204, 0.304);
}

.field__name {
  font-size: 20px;
  font-weight: 500;
}

.field__data {
  font-size: 20px;
  font-weight: 500;
  color: #04AA6D;
  text-align: end;
  justify-content: end;
  align-items: flex-end;
}

.message {
  margin: -10px;
  margin-bottom: 20px;
}

</style>