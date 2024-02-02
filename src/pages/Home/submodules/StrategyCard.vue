<template>
  <div class="strategy_card">
    <li  class="strategy_card__name">
      {{ name }}
    </li >
    <li  class="strategy_card__pair">
      {{ pair }}
    </li >
    <li class="strategy_card__timing">
      {{ timing }}
    </li >
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
.strategy_card {
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  border: 1px solid #f5f5f5;
  border-radius: 5px;

  &__img-block {
    border-bottom: 1px solid #f5f5f5;
  }

  &__name {
    font-size: 31px;
    list-style: none;
    flex: 0 0 33.333333%;
    margin-bottom: 5px;
  }

  &__timing {
    font-size: 21px;
    color: gray;
    overflow: hidden;
  list-style: none;
  flex: 0 0 33.333333%;
    width: 100%;
  }

  &__pair {
    font-size: 21px;
    line-height: 21px;
    color: gray;
    overflow: hidden;
  list-style: none;
  flex: 0 0 33.333333%;
    width: 100%;
  }
}
</style>
