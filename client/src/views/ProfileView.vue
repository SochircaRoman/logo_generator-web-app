<template>

  <main class="profile">
    <section class="profile__content">

      <div class="wrapper">
        <div class="profile__content-container">

          <div class="profile__info">
            <h1 class="profile__title">Profile Information</h1>
          </div>
          
          <hr>

          <div class="img_container">
            <img :src="currentUser['profilePic']" alt="avatar" class="profile_img">
          </div>

          <div class="profile__information">
            <div class="profile__information-field" v-for="field in fieldNames" :key="field.id">
              <div class="field__name">{{ field.name }}:</div>
              <div v-if="field.id == 6" class="field__data">{{ currentUser[field.dbName].split("T")[0] }}</div>
              <div v-else class="field__data">{{ currentUser[field.dbName] }}</div>
            </div>
          </div>

        </div>
      </div>

    </section>
  </main>

</template>

<script>
export default {
  data() {
    return {
      fieldNames: [
      {
        id: 1,
        name: "Username",
        dbName: "username"
      },
      {
        id: 2,
        name: "Id",
        dbName: "_id"
      },
      {
        id: 3,
        name: "Email",
        dbName: "email"
      },
      {
        id: 4,
        name: "Admin Root",
        dbName: "adminRoot"
      },
      {
        id: 5,
        name: "Link Activation",
        dbName: "isActivated"
      },
      {
        id: 6,
        name: "Member Since",
        dbName: "createdAt"
      },
    ],
    }
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
.profile__content {
  margin-top: 75px;
  margin-bottom: 200px;
}
.wrapper {
  max-width: 500px;
}

.profile__title {
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
  max-width: 100px;
  min-height: 100px;
}

.profile__information-field {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 20px;
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