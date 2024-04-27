<template>
  <div class="home">
    <div>
      <HeaderComponent />
    </div>
    
    <ModalWindowComponent 
      v-if="openModWin"
      leftBtnTitle="Запустить в работу"
      windowTitle="Добавить новую задачу"
      @randomEvent = "saveTask(ObjectX)"
      @closeModal = "openModWin = false">
         <div class="addTaskWindow">
          <input class="addTaskWindow__input" type="text" v-model="description"  placeholder="description" :class="{invalid: $v.description.$dirty && !$v.description.required }">
          <span
          class="helper-text"
          v-if="$v.description.$dirty && !$v.description.required"
          >Пожалуйста, заполните поле описания</span>

          <input class="addTaskWindow__input" type="number" v-model="count" placeholder="count" :class="{invalid: $v.count.$dirty && !$v.count.minValue}">
          <span
          class="helper-text-1"
          v-if="$v.count.$dirty && !$v.count.minValue"
          >Минимальное значение  = 1</span>
          
          <div class="addTaskWindow__wrapperCheck">
            <div class="addTaskWindow__wrapperCheck__label">
              <label for="1">Резка</label>
              <label for="2">Гибка</label>
              <label for="3">Покраска</label>
              <label for="4">Отгрузка</label>
            </div>
            <div class="addTaskWindow__wrapperCheck__input">
              <input class = "addTaskWindow__wrapperCheck__checkbox" type="checkbox" value="1" id="1" v-model="productionStages"/>
              <input class = "addTaskWindow__wrapperCheck__checkbox" type="checkbox" value="2" id="2" v-model="productionStages"/>
              <input class = "addTaskWindow__wrapperCheck__checkbox" type="checkbox" value="3" id="3" v-model="productionStages"/>
              <input class = "addTaskWindow__wrapperCheck__checkbox"  type="checkbox" value="4" id="4"   v-model="productionStages"/>
            </div>
          </div>
         </div>
    </ModalWindowComponent>


    <div class="wrapper__home">
        <div class="left_panel">
          <h1 class="left_panel__title">Функциональная панель</h1>
        </div>
        <div class="right__panel">
          <div class="right__panel__top">
            <button class="right__panel__top__btn" @click="openModal" >Добавить задачу</button> 
          </div>
          <div class="right__panel__bottom">
            <p class="right__panel__bottom__text">Выполненные задачи</p>
            <div class="right__panel__bottom__buttons">
              <button class="right__panel__bottom__buttons__btn" @click="switchTempArray(1)">Резка</button>
              <button class="right__panel__bottom__buttons__btn" @click="switchTempArray(2)">Гибка</button>
              <button class="right__panel__bottom__buttons__btn" @click="switchTempArray(3)">Покраска</button>
              <button class="right__panel__bottom__buttons__btn" @click="switchTempArray(4)">Отгрузка</button>
              <button class="right__panel__bottom__buttons__btn" @click="switchTempArray(5)">Общее</button>
            </div>  
            <div class="right__panel__bottom__wrapper">
              <div class="right__panel__bottom__list" v-for="(items, id) in getTempArray" :key="id">
                <div class="right__panel__bottom__list__item">
                  <p>ID: {{ items.id }}</p>
                  <p>Описание: {{ items.description }}</p>
                  <p>Дата: {{ items.date }}</p>
                  <p>Этапы: {{ items.productionStages }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>


    
  </div>
</template>

<script>
  
import ModalWindowComponent from '@/components/ModalWindowComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import { mapGetters, mapMutations } from 'vuex';
import {required, minLength, minValue} from 'vuelidate/lib/validators';


export default {
  name: 'HomeView',
  
  components: {
    ModalWindowComponent,
    HeaderComponent,
},
  data() {
    return {
      openModWin: false,
      id: 0,
      description: '',
      count: 0,
      productionStages: [],
      timeInWork:[],
      file: [],
      ObjectX: {        
        id: 0, 
        description: '',
        count: 0,
        productionStages: [],
        timeInWork:[],
        currentStage: 0,
        file: [],
        comments:[],
        date:'',
      },
    }
  }, 
  validations: {
    description: {required, minLength: minLength(5)},
    count: {minValue: minValue(1)},
    
  },
  methods: {
    ...mapMutations(['setArrayTask', 'newValue','saveInLocalStorage','loadArrayTaskCompleted','switchTempArray']),
    openModal() {
      this.openModWin = true;
    },
    SetObject(ObjectX) {      //изменение объекта
      ObjectX.id = self.crypto.randomUUID();
      ObjectX.description = this.description;
      ObjectX.count = this.count;
      ObjectX.timeInWork.splice(0, ObjectX.timeInWork.length);
      ObjectX.timeInWork.push('Технолог:'+new Date().getDate().toString()+'.'+new Date().getMonth().toString()+'.'+new Date().getFullYear().toString()+' '+new Date().getHours().toString()+':'+new Date().getMinutes().toString()+':'+new Date().getSeconds().toString());
      ObjectX.productionStages = this.productionStages.sort();
      ObjectX.currentStage = this.productionStages[0]; // TODO все поля провалидировать!!!
      ObjectX.date = new Date().getDate().toString()+'.'+new Date().getMonth().toString()+'.'+new Date().getFullYear().toString();
    },
    saveTask(ObjectX) {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return
      }
      this.SetObject(ObjectX);
      if (this.ObjectX.productionStages.length === 0) {
        alert('Не заданы стадии для исполнения');
        return
      }
      this.setArrayTask(ObjectX);
      this.saveInLocalStorage();
      alert('Задача успешно добавлена');
      this.openModWin = false;

    },
    
  },

  computed: {
    ...mapGetters(['getStageTasksCompleted','getTempArray']),
  },

}

</script>

<style lang="scss">
@import '@/assets/styles/_home.scss';
</style>
