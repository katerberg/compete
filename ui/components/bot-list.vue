
<template>
  <div>
    <bot v-for="bot in bots" :key="bot.name" :bot.sync="bot"></bot>
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
