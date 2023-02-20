<template>
  
  <main class="main">
    
      <section class="home__top">
        <div class="wrapper">
          <h1 class="home__top-text">Create your own logo using neural networks</h1>
        </div>
      </section>

      <section class="home__middle">
        <div class="home__middle-rectangle">
          <p class="rectangle__text">
            This is a web logo generator app written for USARB university as a bachelor’s thesis that uses neural networks and specifically GANs networks
          </p>
        </div>
      </section>

      <section class="home__down">
        <div class="wrapper">
          <logos-example :categories="categories"></logos-example>
        </div>
        <div class="home__btn">
          <btn-item btnName="Generate logo"></btn-item>
        </div>
      </section>
      
  </main>  

</template>

<script>
import LogosExample from '../components/Home/LogosExample.vue';
import BtnItem from '../components/UI/btnItem.vue';

export default {
  components: {
    LogosExample,
    BtnItem
  },
  data() {
    return {
      categories: [
        {
          "id": 0,
          "type": "Category 1",
          "logos": [
            {
              "title": "logo 1",
              "image": "logo1.png"
            },
            {
              "title": "logo 2",
              "image": "logo1.png"
            },
            {
              "title": "logo 3",
              "image": "logo1.png"
            },
          ]
        },
        {
          "id": 1,
          "type": "Category 2",
          "logos": [
            {
              "title": "logo 1",
              "image": "logo2.png"
            },
            {
              "title": "logo 2",
              "image": "logo2.png"
            },
            {
              "title": "logo 3",
              "image": "logo2.png"
            },
          ]
        },
        {
          "id": 2,
          "type": "Category 3",
          "logos": [
            {
              "title": "logo 1",
              "image": "logo3.png"
            },
            {
              "title": "logo 2",
              "image": "logo3.png"
            },
            {
              "title": "logo 3",
              "image": "logo3.png"
            },
          ]
        }
      ]
    }
  }
}
</script>

<style>
.home__top {
  text-align: center;
  margin-top: 150px;
  margin-bottom: 80px;
}

.home__top-text {
  font-weight: 500;
  font-size: 44px;
  line-height: 60px;
}

.home__middle {
  background: #EDF7FA;
  padding: 60px 120px;
}

.home__middle-rectangle {
  margin: 0 auto;
  max-width: 400px;
  border-style: solid;
  border-width: 3px;
}

.rectangle__text {
  padding: 15px;
  font-size: 20px;
}

.home__down {
  margin-top: 100px;
  margin-bottom: 100px;
}

.home__btn {
  padding-top: 50px;
  margin: 0 auto;
  width: 200px;
}
</style>