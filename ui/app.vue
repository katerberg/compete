<template>
  <div>
    <h1>Hello World!</h1>
    <bot-list v-bind:bots="bots"></bot-list>
    <button v-on:click="submit">Submit</button>
  </div>
</template>
<script type = "text/javascript" >
  import BotList from './components/bot-list.vue';

  function getBot(name) {
    return {
      name,
      startingStrategy: 'RANDOM',
      continuousStrategy: 'RANDOM',
    };
  }

  export default {
    name: 'app',
    components: {
      BotList,
    },
    data() {
      return {
        bots: [
          getBot('Frida'),
          getBot('Bart'),
          getBot('Molly'),
          getBot('Taylor'),
        ],
      };
    },
    methods: {
      submit() {
        this.bots.forEach(bot => console.log(bot.continuousStrategy));
        console.log('submitting');
      },
    },
  };
</script>
<style>
</style>
