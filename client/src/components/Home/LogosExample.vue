<template>
  
  <div class="example">

    <h2 class="example__title">Some examples of generated logo</h2>

    <div class="example__content">

      <div class="example__content-menu">
        <div
          class="example__menu-wrapper"
          v-for="category in categories"
          :key="category.id"
        >
          <span class="example__menu-line"></span>
          <span class="example__menu-name" @click="selectCurrentCategoryType(category.id)">{{ category.type }}</span>
        </div>
      </div>

      <div class="example__content-categories" v-if="currentCategoryType == 0">
        <span
          class="category__wrapper"
          v-for="(logo, index) in categories[0].logos"
          :key="index"
        >
          <span><img class="category__img" :src="'../../../categories/' + logo.image" :alt="logo.title"></span>
        </span>
      </div>

      <div class="example__content-categories" v-else-if="currentCategoryType == 1">
        <span
          class="category__wrapper"
          v-for="(logo, index) in categories[1].logos"
          :key="index"
        >
          <span><img class="category__img" :src="'../../categories/' + logo.image" :alt="logo.title"></span>
        </span>
      </div>

      <div class="example__content-categories" v-else-if="currentCategoryType == 2">
        <span
          class="category__wrapper"
          v-for="(logo, index) in categories[2].logos"
          :key="index"
        >
          <span><img class="category__img" :src="'../../categories/' + logo.image" :alt="logo.title"></span>
        </span>
      </div>

      <div class="example__content-categories" v-else></div>

    </div>
  </div>

</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      currentCategoryType: null,
    }
  },
  methods: {
    selectCurrentCategoryType(index) {
      switch (index) {
        case 0:
          this.currentCategoryType = 0
          break;
        case 1:
          this.currentCategoryType = 1
          break;
        case 2:
          this.currentCategoryType = 2
          break;
      }
    }
  }
  
}
</script>

<style>
.example{
  margin-bottom: 40px;
}
.example__title {
  font-weight: 600;
  font-size: 34px;
  line-height: 60px;
  color: black;
  margin-bottom: 20px;
}
.example__content-menu {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-bottom: 20px;
}
.example__menu-wrapper:hover {
  cursor: pointer;
  transition: 0.2s all;
  background:#b7b3b3;
  border-left: 5px solid #21243D;
}
.example__menu-line {
  border-left: 1px solid #000000;
  position: absolute;
  height: 60px;
}
.example__menu-name {
  font-weight: 500;
  font-size: 24px;
  line-height: 60px;
  color: black;
  margin-left: 10px;
}
.example__content-categories {
  text-align: center;
  transition: 0.2s all;
}
.category__img {
  width: 60px;
  height: 60px;
  transition: 0.2s all;
}
.category__img:hover {
  transform: scale(1.1);
}
.category__wrapper {
  padding: 30px 10px;
  margin-right: 10px;
}
/* MEDIA START */
@media screen and (max-width: 800px) {
  .example {
    text-align: center;
  }
  .example__content-menu {
    align-content: center;
    margin-bottom: 30px;
  }
  
  .example__menu-line {
    display: flex;
  }
  .example__menu-name {
    display: flex;
  }
}
/* MEDIA END */

</style>