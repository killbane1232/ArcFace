<template>
  <div class="strategy_card">
    <h1>{{ name }}</h1>
    <h1>{{ pair }}</h1>
    <h1>{{ timing }}</h1>
  </div>
</template>

<script lang="ts">
export default {
  name: 'StrategyCard',
  props: {
    name: {
      type: String,
      default: 'Название стратегии'
    },
    pair: {
      type: String,
      default: 'Пара'
    },
    timing: {
      type: String,
      default: 'Размер свечи'
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
