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
    <div class="footer">
      <v-text-field class="add" v-model="newName" label="Создать новую стратегию"/>
      <v-btn class="button" v-on:click.native="add()"> Add </v-btn>
      <v-btn class="button" v-on:click.native="refresh()"> Refresh </v-btn>
    </div>
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
      .then(response => {
        this.strats = response.data
        this.strats.sort((x,y) => { return ( x.id == null ? -1 : (y.id == null ? 1 : (x.id > y.id ? 1 : -1 ))) });
      });
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
          .then(response => {
            this.strats = response.data; 
            this.strats.sort((x,y) => { return ( x.id == null ? -1 : (y.id == null ? 1 : (x.id > y.id ? 1 : -1 )));
            });})
      )
    ;
    }
  },
  mounted() {
    StrategyService.getAll()
      .then(response => {
        this.strats = response.data
        this.strats.sort((x,y) => { return ( x.id == null ? -1 : (y.id == null ? 1 : (x.id > y.id ? 1 : -1 ))) });
      });
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer{
  display: flex;
  align-items: center;
}
.add {
  width: 60%;
  margin:0px 2px;
  flex: 0 0 49%;
}
.button {
  margin:0px 2px;
  padding:10px 0;
  flex: 0 0 24.5%;
}
</style>
