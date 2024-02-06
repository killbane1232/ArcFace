<template>
  <div class="hello">
    <StrategyCard 
    v-for="strat in strats"
    :key="strat.id?strat.id:0"
    :id="strat.id?strat.id:0"
    :name="strat.name+''"
    :pair_value="strat.pairId?strat.pairId:0"
    :timing_value="strat.timingId?strat.timingId:0"
    :leverage_value="strat.leverage?strat.leverage:0"
    @on-remove="refresh()"/>
    <li>
    <v-text-field v-model="newName" label="Создать новую стратегию"/>
    </li>
    <li>
    <v-btn v-on:click.native="add()"> Add </v-btn>
    </li>
    <li>
    <v-btn v-on:click.native="refresh()"> Refresh </v-btn>
    </li>
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
      strats : new Array<Strategy>(),
      newName : "",
    }
  },
  methods : {
    refresh() {
    StrategyService.getAll()
      .then(response => (this.strats = response.data));
    },
    add() {
      var strat : Strategy = {
        name : this.newName,
        isPublic : false,
        pairId : null,
        timingId : null,
        id : 0,
        isLong : null,
        isShort : null,
        leverage : null,
        strategyIndicators : []
      }
      StrategyService.post(strat).then(()=>
        StrategyService.getAll()
          .then(response => (this.strats = response.data))
      )
    ;
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
