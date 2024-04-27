<template>
  <div class="task__wrapper">
    <HeaderComponent></HeaderComponent>
    <p class="task__wrapper__title">Задачи на стадию: {{ stage }}</p>
    <div class="task__wrapper__list">
      <div class="task__wrapper__item" v-for="(task, id) in getStageTasks('1')" :key="id">
        <p>Количество: {{ task.count }}</p>
        <p>Описание: {{ task.description }}</p>
        <p>Поступило в работу: {{ task.timeInWork[0] }}</p>
        <p>ID: {{ task.id }}</p>
        <div class="task__wrapper__item__buttons">
          <button class="task__wrapper__item__buttons__btn">Скачать файл</button>
          <button class="task__wrapper__item__buttons__btn" @click="setTimeStart(task.id),saveInLocalStorage()">Начать задачу</button>
          <button class="task__wrapper__item__buttons__btn" @click = "task.count-=1, deleteItem(task.count, task.id)">Завершить</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import HeaderComponent from '@/components/HeaderComponent.vue';

export default {
  name: 'TaskView',

  components: {
    HeaderComponent,
  },

  data() {
    return {
      array:[],
      count: 0,
      stage:"РЕЗКА",
    };
  },

  mounted() {
  },

  methods: {
    ...mapMutations(['setArrayTask', 'newValue', 'setTimeStart', 'setTimeEnd', 'saveInLocalStorage', 'pushInCutArray', 'setCurrentStage',]),
    deleteItem(count, id) {
      if (count === 0) {
        this.pushInCutArray(id); //только для первой стадии обработки "резки"
        this.setTimeEnd(id);
        this.setCurrentStage(id);
      }
    },

  },
  computed: {
    ...mapGetters(['number', 'getStageTasks']),
    
  }
};
</script>

<style lang="scss">
@import '@/assets/styles/_taskComponent.scss';
</style>