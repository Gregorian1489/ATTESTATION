<template>
  <div class="wrapper">
    <div class="nav">
        <router-link to="/">
            <button class="nav__btn">Выйти</button>
        </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',

  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>
<style lang="scss">
@import '@/assets/styles/_header.scss';
</style>
