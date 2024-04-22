import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      arrayTask:[
      ],
      arrayCuttingComplete:[],
      arrayBendComplete:[],
      arrayPeintingComplete:[],
      arrayTaskCompleted:[],
      tempArrayTaskCompleted: [],
      arrayOfAuthorization: [
        {
          admin: "admin1234",
        },
        {
          cutter: "user11",
        },
      ]
    },
    mutations: {
        autorizationMethod(state, arr) {
          for (let i = 0; i < state.arrayOfAuthorization.length; i++) {
            if (state.arrayOfAuthorization[i].admin === arr[0]) {
            window.location.href = 'http://localhost:8080/admin';
            } else if (state.arrayOfAuthorization[i].cutter === arr[0]) {
            window.location.href = 'http://localhost:8080/task';
            } else {
              console.log();("Неверный логин или пароль");
            }
          }
          
        },
        setArrayTask(state, Object) {
          let Clone = {};
          for (let key in Object) {      
          Clone[key] = Object[key];
          }
          state.arrayTask.push(Clone);
        },
        saveInLocalStorage(state) {
          localStorage.setItem("arrayTask", JSON.stringify(state.arrayTask));
        },
        loadFromLocalStorage(state) {
          state.arrayTask = JSON.parse(localStorage.getItem("arrayTask") || "[]");
        },
        loadArrayTaskCompleted(state) {
          state.arrayTaskCompleted = JSON.parse(localStorage.getItem("arrayTaskCompleted") || "[]");
        },
        setTimeStart(state, id) {
            state.arrayTask.find( item => item.id === id).timeInWork.push("Взято в работу: " + new Date().getDate().toString()+'.'+new Date().getMonth().toString()+'.'+new Date().getFullYear().toString()+' '+new Date().getHours().toString()+':'+new Date().getMinutes().toString()+':'+new Date().getSeconds().toString());
        },
        setTimeEnd(state, id) {
            state.arrayTask.find( item => item.id === id).timeInWork.push("Завершено:" + new Date().getDate().toString()+'.'+new Date().getMonth().toString()+'.'+new Date().getFullYear().toString()+' '+new Date().getHours().toString()+':'+new Date().getMinutes().toString()+':'+new Date().getSeconds().toString());
          },
        pushInCutArray(state, id) {
          state.arrayCuttingComplete.push(state.arrayTask.find( item => item.id === id)); 
          localStorage.setItem("arrayCuttingComplete", JSON.stringify(state.arrayCuttingComplete));  
        },
        setCurrentStage(state, id) { 
// Метод для переключения стадии задачи. Если стадия последняя, то удаляет задачу из основного массива 
// и переносит ее в массив "завершенных задач"          
          let tempCurrentStage = state.arrayTask.find( item => item.id === id).currentStage;
          let tempArray = [];
          tempArray = state.arrayTask.find( item => item.id === id).productionStages;
          for (let i = 0; i < tempArray.length; i++) {
            if (tempCurrentStage === '4') {
              state.arrayTaskCompleted.push(state.arrayTask.find( item => item.id === id));
              localStorage.setItem("arrayTaskCompleted", JSON.stringify(state.arrayTaskCompleted));

              state.arrayTask.splice(state.arrayTask.indexOf(state.arrayTask.find( item => item.id === id)), 1);

              localStorage.setItem("arrayTask", JSON.stringify(state.arrayTask))
            
            } else if (tempArray[i] === tempCurrentStage) {
              state.arrayTask.find( item => item.id === id).currentStage = tempArray[i+1];

              state.arrayTask.find( item => item.id === id).count = JSON.parse(localStorage.getItem("arrayTask")).find( item => item.id === id).count;

              localStorage.setItem("arrayTask", JSON.stringify(state.arrayTask));
            }
          } 
        },
        switchTempArray(state, num) {
          if (num===1) {
            state.tempArrayTaskCompleted = JSON.parse(localStorage.getItem("arrayCuttingComplete") || "[]");
          }
          if (num===5) {
            state.tempArrayTaskCompleted = JSON.parse(localStorage.getItem("arrayTaskCompleted") || "[]");
          }
        },
        
    },
    actions: {
        
    },
    getters : {
        getStageTasks: (state) => (stageNum) => {
           return state.arrayTask.filter((item) => item.currentStage === stageNum);
        },
        getStageTasksCompleted: state => {
          return state.arrayTaskCompleted;
        },
        getTempArray: state => {
          return state.tempArrayTaskCompleted;
        },
    }
  })

  export default store;