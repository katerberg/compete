<template>
  <div>
    <h3>{{bot.name}}</h3>
    <div>
      <label for="bot1Name">Name</label>
      <input type="text" name="bot1Name" v-model="bot.name" />
    </div>
    <div>
      <label for="bot1Start">Starting Strategy</label>
      <select name="bot1Start" v-model="bot.startingStrategy">
        <option value="RANDOM">Random</option>
        <option value="FRIENDLY">Cooperative</option>
        <option value="UNFRIENDLY">Uncooperative</option>
      </select>
    </div>
    <div>
      <label for="bot1Strategy">Continuous Strategy</label>
      <select name="bot1Strategy" v-model="bot.continuousStrategy">
        <option value="RANDOM">Random</option>
        <option value="COOPERATIVE">Cooperative</option>
        <option value="UNCOOPERATIVE">Uncooperative</option>
        <option value="TITFORTAT">Tit-For-Tat</option>
        <option value="BASEBALL">Baseball</option>
        <option value="BACKANDFORTH">Back-And-Forth</option>
        <option value="FRIENDLY">Roadhouse</option>
      </select>
    </div>
  </div>
</template>
<script type = "text/javascript" >
  export default {
    props: ['bot'],
  };
</script>
