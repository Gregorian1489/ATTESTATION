<template>
    <div class="task">
      <TaskComponent />
    </div>
  </template>
  
  <script>
  import TaskComponent from '@/components/TaskComponent.vue';
  
  
  
  export default {
    name: 'TaskView',
    components: {
      TaskComponent,
      
  }
  }
  </script>
  