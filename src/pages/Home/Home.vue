<template>
  <div class="hello">
    <StrategyCard 
    v-for="strat in $data.strats"
    :key="strat.id"
    :id="strat.id"
    :name="strat.name"
    :pair="strat.pairId + ''"
    :timing="strat.timingId + ''"
    />
    <v-btn v-on:click.native="refresh()"> Refresh </v-btn>
  </div>
</template>

<script lang="ts">
import { Strategy, StrategyService } from "@/api";
import StrategyCard from "./submodules/StrategyCard.vue"

export default {
  name: "StrategyContent",
  components: {StrategyCard},
  data() {
    return {
      strats : new Array<Strategy>()
    }
  },
  methods : {
    refresh() {
    StrategyService.getAll()
      .then(response => (this.strats = response.data));
    }
  },
  mounted() {
    StrategyService.getAll()
      .then(response => (this.strats = response.data));
  }
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
