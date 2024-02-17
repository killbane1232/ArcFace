<template>
  <div class="hello">
    <AccountCard 
    v-for="strat in accs"
    :key="strat.name"
    :platformId="strat.platformId?strat.platformId:0"
    :name="strat.name+''"
    :strategyId="strat.strategyId?strat.strategyId:0"
    :isActive="strat.isActive?strat.isActive:false"
    :strategies="strats"
    @on-update="refresh()"/>
    <!--div class="footer">
      <v-text-field class="add" v-model="newName" label="Создать новую стратегию"/>
      <v-btn class="button" v-on:click.native="add()"> Add </v-btn>
      <v-btn class="button" v-on:click.native="refresh()"> Refresh </v-btn>
    </div-->
  </div>
</template>

<script lang="ts">
import { Account, AccountService, Strategy, StrategyService } from "@/api";
import AccountCard from "./submodules/AccountCard.vue"

export default {
  name: "AccountContent",
  components: {AccountCard},
  data() {
    return {
      accs : new Array<Account>(),
      strats : new Array<Strategy>(),
      newName : "",
    }
  },
  methods : {
    refresh() {
      AccountService.get()
        .then(response => {
          this.accs = response.data
          this.accs.sort((x,y) => { return (x.name > y.name ? 1 : -1) });
          StrategyService.getAll().then(res => {
            this.strats = res.data; 
            this.strats.sort((x,y) => { return ( x.id == null ? -1 : (y.id == null ? 1 : (x.id > y.id ? 1 : -1 )));
          })
        })
      });
    },
  },
  mounted() {
    AccountService.get()
      .then(response => {
        this.accs = response.data
        this.accs.sort((x,y) => { return (x.name > y.name ? 1 : -1) });
        StrategyService.getAll().then(res => {
          this.strats = res.data; 
          this.strats.sort((x,y) => { return ( x.id == null ? -1 : (y.id == null ? 1 : (x.id > y.id ? 1 : -1 )));
        })
      })
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
