<template>  
    <div class="autorization__wrapper">
      <input class="autorization__wrapper__input" type="text" v-model="login" placeholder="login">
      <input class="autorization__wrapper__input" type="text" v-model="password" placeholder="password">
      <button class="autorization__wrapper__btn" @click="autorization(login, password)">ВХОД</button>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
name: 'AutorizationView',

  data() {
    return {
      login: "",
      password: "",
    };
  },

  mounted() {
    
  },

  methods: {
    ...mapMutations(['autorizationMethod',]),
    autorization(login, password) {
      let autorizationArray = [];
      autorizationArray.push(login+password);
      this.autorizationMethod(autorizationArray);
      
    }
  },
  computed: {
    ...mapGetters(['getStageTasksCompleted']),
  }
};
</script>

<style lang="scss">
@import '@/assets/styles/_autorization.scss';
</style>