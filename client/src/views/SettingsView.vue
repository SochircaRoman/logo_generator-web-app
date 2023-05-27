<template>

  <main class="settings">
    <section class="settings__content">

      <div class="wrapper">
        <div class="settings__content-container">

          <loading-item v-if="loading"></loading-item>
          
          <div class="settings__info">
            <h1 class="settings__title">Edit Profile</h1>
          </div>

          <hr>

          <div class="settings__update-container">
            <div class="img__container">
              
              <img v-if="!previewImage" class="profile__img" :src="currentUser['profilePic']" alt="avatar">
              <img v-else class="profile__img" :src="previewImage" alt="avatar">
              <input class="profile__select" type="file" accept=".png, .jpg, .jpeg" @change="onFileSelected" ref="fileInput">
              <btn-item @click="$refs.fileInput.click()" class="settings__select-btn" btnName="Select Picture"></btn-item>
            </div>
            <btn-item @click="updatePicture()" class="settings__update-btn" btnName="Update Picture"></btn-item>
            <div class="message" v-if="messages[3].visible">
              <div :class="successful ? 'message__success' : 'message__alert'">
                {{ messages[3].text }}
              </div>
            </div>
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
              <div class="message" v-if="messages[0].visible">
                <div :class="successful ? 'message__success' : 'message__alert'">
                  {{ messages[0].text }}
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
              <div class="message" v-if="messages[1].visible">
                <div :class="successful ? 'message__success' : 'message__alert'">
                  {{ messages[1].text }}
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
              <input-item class="profile__input-item" type="text" name="newEmail" placeholder="New Email"></input-item>
              <btn-item class="settings__update-btn" btnName="Update Email"></btn-item>
              <div class="message" v-if="messages[2].visible">
                <div :class="successful ? 'message__success' : 'message__alert'">
                  {{ messages[2].text }}
                </div>
              </div>
            </div>
          </Form>

          <div class="settings__update-container">
            <div class="settings__upload-background">
              <p class="settings__upload-info">Deleting your account will permanetly remove your profile and loss all your data!</p>
              <p class="settings__upload-info">Please carefully consider the implications mentioned above before proceeding with the account deletion</p>
            </div>
            <btn-item @click="deleteUser" btnName="Delete Account" :red="true" class="settings__update-btn"></btn-item>
            <div class="message" v-if="messages[4].visible">
              <div :class="successful ? 'message__success' : 'message__alert'">
                {{ messages[4].text }}
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  </main>

</template>

<script>
import BtnItem from "../components/UI/BtnItem.vue";
import LoadingItem from "../components/UI/LoadingItem.vue";
import InputItem from "../components/UI/InputItem.vue";
import { Form } from "vee-validate";
import * as yup from "yup";
export default {
  components: {
    BtnItem,
    LoadingItem,
    InputItem,
    Form,
  },
  data() {
    return {
      logos: [],
      selectedFile: null,
      previewImage: "",

      successful: false,
      loading: false,
      messages: [
        {
          visible: false,
          text: "",
        },
        {
          visible: false,
          text: "",
        },
        {
          visible: false,
          text: "",
        },
        {
          visible: false,
          text: "",
        },
        {
          visible: false,
          text: "",
        },
      ],
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
        newEmail: yup.string().email().required("Email is required!").label("Email"),
      })
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    currentUserId() {
      return this.$store.state.auth.user._id;
    },
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.previewImage = URL.createObjectURL(this.selectedFile);
    },
    updatePicture() {
      this.messages[3].visible = true;

      if (this.selectedFile === null) {
        this.messages[3].text = "No picture selected!";
        return false
      }
      if (this.selectedFile.type == "image/png" || this.selectedFile.type == "image/jpeg" || this.selectedFile.type == "image/jpg") {
        this.loading = true;
        this.successful = false;

        this.$store.dispatch("users/uploadFile", {file: this.selectedFile, id: this.currentUserId}).then(
        (data) => {
          this.messages[3].text = data.message;
          this.successful = true;
          this.loading = false;
          setTimeout(() => {this.$router.go()}, 3000);
        },
        (error) => {
          this.messages[3].text = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          this.successful = false;
          this.loading = false;
        }
      )
      } else {
        this.messages[3].text = "Invalid image format!";
      }
    },
    updateUsername(user) {
      this.messages[0].visible = true;

      const resultUsername = user.newUsername.trim().replace(/[^A-Z0-9]+/ig, "");
      if (!resultUsername) {
        this.messages[0].text = "Please enter a valid username!";
        return false
      }

      this.loading = true;
      this.successful = false;

      this.$store.dispatch("users/updateUsername", {newUsername: resultUsername, id: this.currentUserId}).then(
        (data) => {
          this.messages[0].text = data.message;
          this.successful = true;
          this.loading = false;
          setTimeout(() => {this.$router.go()}, 3000);
        },
        (error) => {
          this.messages[0].text = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          this.successful = false;
          this.loading = false;
        }
      )
    },
    updatePassword(user) {
      this.messages[1].visible = true;

      if (!user.oldPassword.trim() && !user.newPassword.trim()) {
        this.messages[1].text = "Please enter a valid password!";
        return false
      }

      this.loading = true;
      this.successful = false;

      this.$store.dispatch("users/updatePassword", {oldPassword: user.oldPassword, newPassword: user.newPassword, id: this.currentUserId}).then(
        (data) => {
          this.messages[1].text = data.message;
          this.successful = true;
          this.loading = false;
          setTimeout(() => {this.$router.go()}, 3000);
        },
        (error) => {
          this.messages[1].text = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          this.successful = false;
          this.loading = false;
        }
      )
    },
    updateEmail(user) {
      this.messages[2].visible = true;

      const resultEmail = user.newEmail.trim();
      if (!resultEmail) {
        this.messages[2].text = "Please enter a valid Email!";
        return false
      }

      this.loading = true;
      this.successful = false;

      this.$store.dispatch("users/updateEmail", {newEmail: resultEmail, id: this.currentUserId}).then(
        (data) => {
          this.messages[2].text = data.message;
          this.successful = true;
          this.loading = false;
          setTimeout(() => {this.$router.go()}, 3000);
        },
        (error) => {
          this.messages[2].text = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          this.successful = false;
          this.loading = false;
        }
      )
    },
    deleteUser() {
      this.messages[4].visible = true;
      this.loading = true;
      this.successful = false;

      this.$store.dispatch("logos/getUserLogos", {id: this.currentUserId}).then(
        (data) => {
          for (const logo of data.data.logos) {
            this.logos.push(logo["name"])
          }
          this.$store.dispatch("logos/deleteAllLogos", {id: this.currentUserId, logos: this.logos}).then(
            (data) => {
              this.$store.dispatch("users/deleteUser", {id: this.currentUserId}).then(
                (data) => {
                  this.messages[4].text = data.message;
                  this.successful = true;
                  this.loading = false;
                  setTimeout(() => {
                    this.$store.dispatch('auth/logout').then( () => {
                      this.$router.push('/register')
                    }
                    )
                  }, 3000)
                },
                (error) => {
                  this.messages[4].text = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                  this.successful = false;
                  this.loading = false;
                }
              )
            },
            (error) => {
              this.messages[4].text = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
              this.successful = false;
              this.loading = false;
            }
          )
        },
        (error) => {
          this.messages[4].text = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          this.successful = false;
          this.loading = false;
        }
      )
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

.img__container {
  text-align: center;
  margin: 24px 0px 15px 0px;
}

.profile__img {
  border-radius: 50%;
  max-width: 100px;
  min-height: 100px;
}

.profile__select {
  display: none;
}

.settings__select-btn {

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
  margin: 0 auto;
  margin-bottom: 20px;
  font-size: 20px;
  background-color: #d1dcd88a;
  padding: 10px;
}
.message__success {
  color: #04AA6D;
  text-align: center;
}
.message__alert {
  color: #f23648;
  text-align: center;
}

</style>