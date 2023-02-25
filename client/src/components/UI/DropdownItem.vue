<template>

  <div class="menu__item" @click="isOpen = !isOpen">

    <div class="header__profile">
      <img src="/png/user.png" alt="profile">
      {{ username }}
      <img v-if="!isOpen" class="menu__caret" src="/svg/caret_down.svg" alt="down">
      <img v-if="isOpen" class="menu__caret" src="/svg/caret_up.svg" alt="up">
    </div>

    
      <div class="sub__menu" v-if="isOpen">
        <ul class="sub__menu-items">
          <li v-for="(item, i) in items" :key="i" class="sub__menu-item">
            <router-link :to="item.link" class="sub__menu-link">
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </div>
  </div>
  
</template>

<script>
export default {
  props: ["username", "items"],
  data() {
    return {
      isOpen: false
    }
  },
  created() {
    window.addEventListener('click', this.hideDropdown);
  },
  methods: {
    hideDropdown(event) {
      if (!event.target.matches('.header__profile')) {
        this.isOpen = false;
      }
    },
  }
}
</script>

<style>
.header__profile {
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  color: #000000;
  cursor: pointer;
}

.menu__caret {
  width: 30px;
  height: 30px;
  margin-left: -5px;
}

.header__profile:hover, .header__profile:focus, .header__profile:active {
  color: burlywood;
}

.sub__menu-link:hover, .sub__menu-link:focus {
  color: burlywood;
}

.menu__item {
  position: relative;
  z-index: 2;
}

.sub__menu {
  position: absolute;
  left: 10%;
  box-shadow: 0px 10px 12px -3px rgb(0 0 0 / 30%);
  padding: 10px 25px;
  border-radius: 0px 0px 26px 26px;
  margin-top: 7px;
}

.sub__menu-item {
  margin-bottom: 10px;
}

.sub__menu-link {
  color: #000000;
  text-decoration: none;
  font-size: 20px;
  line-height: 29px;
}
</style>