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

          <div class="settings__update-container">
            <div class="profile__information-field">
              <div class="field__name">Username:</div>
              <div class="field__data">{{ currentUser.username }}</div>
            </div>
            <input-item class="profile__input-item" type="text" name="" placeholder="New Username"></input-item>
            <btn-item class="settings__update-btn" btnName="Update Username"></btn-item>
          </div>

          <div class="settings__update-container">
            <div class="profile__information-field">
              <div class="field__name">Password:</div>
              <div class="field__data">********</div>
            </div>
            <input-item class="profile__input-item" type="password" name="" placeholder="Old Password"></input-item>
            <input-item class="profile__input-item" type="password" name="" placeholder="New Password"></input-item>
            <btn-item class="settings__update-btn" btnName="Update Password"></btn-item>
          </div>

          <div class="settings__update-container">
            <div class="profile__information-field">
              <div class="field__name">Email:</div>
              <div class="field__data">{{ currentUser.email }}</div>
            </div>
            <input-item class="profile__input-item" type="text" name="" placeholder="New Email"></input-item>
            <btn-item class="settings__update-btn" btnName="Update Email"></btn-item>
          </div>


        </div>
      </div>

    </section>
  </main>

</template>

<script>
import BtnItem from "../components/UI/btnItem.vue";
import InputItem from "../components/UI/InputItem.vue";
export default {
  components: {
    BtnItem,
    InputItem
  },
  data() {
    return {}
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
  
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

</style>