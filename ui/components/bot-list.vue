
<template>
  <div>
    <bot v-for="(bot, index) in bots" :key="index" v-bind:bot="bot"></bot>
  </div>
</template>
<script type = "text/javascript">
  import Bot from './bot.vue';

  export default {
    components: {
      Bot,
    },
    props: ['bots'],
  };
</script>
