<template>
  <div class="modalWindow">
    <div class="modalWindow__header">
        <span>{{ windowTitle }}</span>
        <span>
          <img 
          class="modalWindow__header__close" src="../assets/img/icons_close.png" alt="close_icon" @click="closeModal">
        </span>
    </div>
    <div class="modalWindow__content">
        <slot></slot>        
    </div>
    <div class="modalWindow__footer">
        <button class="modalWindow__footer__leftBtn" @click ="randomEvent">{{ leftBtnTitle }}</button>
        <button class="modalWindow__footer__closeBtn" @click="closeModal">Закрыть окно</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalWindowComponent',
  data() {
    return {
      
    };
  },
  props: {
    leftBtnTitle: {
        type: String,
        default: 'Кнопка по умолчанию',
    },
    windowTitle: {
        type: String,
        default: 'Заголовок по умолчанию',
    }  
  },
  methods: {
    closeModal() {
        this.$emit('closeModal');
    },
    randomEvent() {
        this.$emit('randomEvent');
    }
  }
};
</script>
<style lang="scss">
@import '@/assets/styles/_modal.scss';

</style>