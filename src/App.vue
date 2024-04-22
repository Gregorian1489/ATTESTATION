<template>
  <router-view/>
</template>

<style lang="scss">
@import url('@/assets/styles/_fonts.scss');
@import url('@/assets/styles/_general_style.scss');

</style>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'App',
  methods: {
    ...mapMutations(['setArrayTask', 'newValue', 'loadFromLocalStorage']),
  },
  computed: {
    ...mapGetters(['number', 'descriptionGetters', 'dateGetters']),
  },
  mounted() {
    this.loadFromLocalStorage();
  }
};
</script>
