
<template>
  <div>
    <h1>Hello World!</h1>
    <bot-list v-bind:bots="bots"></bot-list>
  </div>
</template>
<script type = "text/javascript" >
  import BotList from './components/bot-list.vue';

  export default {
    name: 'app',
    components: {
      BotList,
    },
    data() {
      return {
        bots: [
          {name: 'Frida'},
          {name: 'Bart'},
          {name: 'Molly'},
        ],
      };
    },
  };
</script>
<style>
</style>
