<template>
  <header class="header">
    <div class="header__wrapper">

      <nav class="header__nav">

        <ul class="header__list">
          <li class="header__item noselect"
            v-for="item in headerItems"
            :key="item"
            @click="handleRemoveBurger(); handleLoad()"
          ><router-link :to="`/${item.toLowerCase()}`" class="header__link">{{ item }}</router-link>
          </li>
        </ul>

        <div @click="handleRemoveBurger()" class="header__nav-close">
          <span class="header__nav-close-line"></span>
          <span class="header__nav-close-line"></span>
        </div>

      </nav>

      <div v-if="!currentUser" class="header__authorization">
        <ul class="header__list">
          <li class="header__item noselect">
            <router-link to="/register" class="header__link">
              <img src="/png/register.png" alt="register">
              Register
            </router-link>
          </li>
          
          <li class="header__item noselect">
            <router-link to="/login" class="header__link">
              <img src="/png/login.png" alt="login">
              Login
            </router-link>
          </li>
        </ul>
      </div>

      <div v-if="currentUser">
        <ul class="header__list">

          <li class="header__item noselect">
            <dropdown-item :username="currentUser.username" :items="items"></dropdown-item>
          </li>

          <li class="header__item noselect">
            <a @click.prevent="handleLogout" class="header__link">
              <img src="/png/logout.png" alt="">
              Logout
            </a>
          </li>
        </ul>

      </div>

      <div @click="handleAddBurger()" class="header__burger burger">
        <span class="burger__line burger__line_first"></span>
        <span class="burger__line burger__line_second"></span>
        <span class="burger__line burger__line_third"></span>
      </div>

    </div>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router';
import DropdownItem from './UI/DropdownItem.vue';

export default {
  components: {
    RouterLink,
    DropdownItem,
  },
  data() {
    return {
      headerItems: ["Home", "About"],
      items: [
        {
          title: "Profile",
          link: "/profile"
        },
        {
          title: "Settings",
          link: "/settings"
        },
        {
          title: "Logos",
          link: "/logos"
        }
      ]
    }
  },
  created() {
    window.addEventListener('load', this.handleLoad);
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    handleScroll() {
      window.onscroll = () => {
        const header = document.querySelector(".header");
        if (window.pageYOffset > 50) {
          header.classList.add("header_active");
        } else {
          header.classList.remove("header_active");
        }
      }
    },
    handleLoad() {
      window.scrollTo({
        top: 0,
        left: 0, 
        behavior: 'smooth'
      });
    },
    handleAddBurger() {
      document.querySelector(".header__nav").classList.add("header__nav_active");
    },
    handleRemoveBurger() {
      document.querySelector(".header__nav").classList.remove("header__nav_active");
    },
    handleLogout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
}
</script>

<style scoped>
/* START HEADER */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transition: .2s linear;
  padding-bottom: 10px;
  z-index: 999;
}

.header_active {
  background: white;
  -webkit-box-shadow: 0px 3px 10px -3px rgba(0,0,0,0.5);
  -moz-box-shadow: 0px 3px 10px -3px rgba(0,0,0,0.5);
  box-shadow: 0px 3px 10px -3px rgba(0,0,0,0.5);
}

.header__wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-top: 27px;
  padding: 0 15px;
  margin-top: 10px;
}

.header__list {
  display: flex;
  flex-wrap: wrap;
}

.header__item {
  margin-right: 33px;
}

.header__item:last-child {
  margin-right: 0;
}

.header__link {
  font-weight: 500;
  font-size: 22px;
  line-height: 29px;
  color: #000000;
  text-decoration: none;
  cursor: pointer;
}

.header__link:hover, .header__link:focus, .header__link:active {
  color: burlywood;
}
.router-link-active {
  color: burlywood;
}
.header__burger {
  display: none;
  width: 40px;
  height: 28px;
  position: relative;
}
.burger__line {
  display: block;
  width: 100%;
  height: 3px;
  background-color: #000;
  position: absolute;
  left: 0;
}
.burger__line_first {
  top: 0;
}
.burger__line_second {
  top: 50%;
  transform: translateY(-50%);
}
.burger__line_third {
  bottom: 0;
}
/* END HEADER */
/* HEADER BURGER */
@media screen and (max-width: 767px) {
  .header__burger {
    display: block;
    cursor: pointer;
  }
  .header__nav {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: white;
    z-index: 10;
    padding: 50px;
    transform: translateX(100%);
    transition: .3s all linear;
  }
  .header__nav_active {
    transform: translateX(0);
  }
  .header__item {
    width: 100%;
    margin-right: 0;
    margin-bottom: 30px;
  }  
  .header__item:last-child {
    margin-bottom: 0;
  }
  .header__link {
    font-size: 35px;
    line-height: 40px;
  }
  .header__nav-close {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 11;
    cursor: pointer;
  }
  .header__nav-close-line {
    display: block;
    width: 100%;
    height: 3px;
    background: #000000;
    position: absolute;
    top: 50%;
  }
  .header__nav-close-line:first-child {
    transform: translateY(-50%) rotate(45deg);
  }
  .header__nav-close-line:last-child {
    transform: translateY(-50%) rotate(-45deg);
  }
}
/* HEADER BURGER */

</style>