<template>
  <div class="hello">
    <StrategyCard 
    v-for="strat in strats"
    :key="strat.Id"
    :name="strat.Name"
    :pair="strat.PairId + ''"
    :timing="strat.TimingId + ''"
    />
  </div>
</template>

<script lang="ts">
import { Strategy } from "@/api";
import StrategyCard from "./submodules/StrategyCard.vue"

export default {
  name: "StrategyContent",
  components: {StrategyCard},
  props: {
    strats: {
      type: Array<Strategy>,
      default: []
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
