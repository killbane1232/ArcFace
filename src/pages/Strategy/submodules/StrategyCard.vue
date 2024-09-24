<template>
  <div class="strategy_card" >
    <div class="strategy_card__name">{{ name }}</div>
    <v-btn class="strategy_card__remove" v-on:click.native="remove()" :disabled="loading"> Remove </v-btn>
    <v-btn class="strategy_card__test" v-on:click.native="test()" :disabled="loading"> Test <v-icon  v-if="loading" icon="mdi-timer-sand-empty" /></v-btn>
    <v-text-field
      v-model="newValue"
      hide-details
      single-line
      type="number"
      class="strategy_card__value"/>
    <v-btn class="strategy_card__test" v-on:click.native="beautify()" :disabled="loading"> Beautify <v-icon  v-if="loading" icon="mdi-timer-sand-empty" /></v-btn>
    <v-btn v-on:click.native="getIndicators()" class="strategy_card__setup" :disabled="loading"> Edit </v-btn>
    <v-dialog
      v-model="dialog"
      width="75%"
    >
      <v-card>
        <div class="strategy_card__name"> {{ name }} </div >
        <div class="strategy_card__parameters">
          <v-select v-model="pair" :items="pairs" item-title="name"  item-value="id" label="Pairs" class="strategy_card__pair"/>
          <v-select v-model="timing" :items="timings" item-title="name"  item-value="id" label="Timings" class="strategy_card__timing"/>
          <v-text-field v-model="leverage" 
            type="number"
            class="strategy_card__timing"
            label="Leverage"/>
        </div>
        <StrategyIndicatorCard 
          v-for="stratI in data"
          :key="stratI.id"
          :id="stratI.id"
          :name="stratI.name"
          :isExitValue="stratI.isExit"
          :inputFields="stratI.inputFields"
          :stratId="stratI.strategyId"
          ref="data"
          @on-remove="refresh()"/>
        <v-btn v-on:click.native="getIndicatorsToAdd()" class="strategy_card__add">
          Add
        </v-btn>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false; save()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_indicator" width="50%">
      <v-card>
        <IndicatorCard 
          v-for="stratI in indicators"
          :key="stratI.id"
          :id="stratI.id"
          :name="stratI.name"
          :stratId="id"
          ref="data"
          @on-add="addEvent()"/>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog_indicator = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Indicator, IndicatorService, Pair, PairService, Strategy, StrategyIndicator, Timing, TimingService } from '@/api';
import StrategyService from '@/api/api-services/strategy-service/strategyService';
import StrategyIndicatorCard  from './StrategyIndicatorCard.vue';
import IndicatorCard  from './IndicatorCard.vue';
import { TestService } from '@/api/api-services/test-service';
export default {
  name: 'StrategyCard',
  components: {StrategyIndicatorCard, IndicatorCard},
  props: {
    id: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: 'Название стратегии'
    },
    timing_value: {
      type: Number,
      default: 0
    },
    pair_value: {
      type: Number,
      default: 0
    },
    leverage_value: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      dialog: false,
      dialog_indicator: false,
      data: Array<StrategyIndicator>(),
      indicators: Array<Indicator>(),
      timings: Array<Timing>(),
      pairs: Array<Pair>(),
      pair_name: '',
      timing_name: '',
      pair:this.pair_value,
      timing:this.timing_value,
      leverage:this.leverage_value,
      loading:false,
      generationsCnt:0
    }
  },
  methods : {
    save() {
      var strat :Strategy = {
        id: this.id,
        name: this.name,
        pairId: this.pair,
        isPublic: null,
        timingId: this.timing,
        isLong: null,
        isShort: null,
        leverage: this.leverage,
        strategyIndicators: []
      };
      for(var i in this.data) {
        strat.strategyIndicators?.push((this.$refs['data'] as any)[i].save() as StrategyIndicator);
      }
      StrategyService.patch(strat).then(()=>
        this.$emit('on-remove')
      );
    },
    refresh() {
      StrategyService.get(this.id)
        .then(response => {
          if (response.error == null) {
            this.data = response.data[0].strategyIndicators
            this.data.sort((x,y) => { return ( x.id > y.id ? 1 : -1 ) });
            this.data.forEach(x=>{
                x.inputFields.sort((x,y) => { return ( x.indicatorFieldId > y.indicatorFieldId ? 1 : -1 ) });
            })
            this.dialog = true
          }
        });
    },
    getIndicators() {
      StrategyService.get(this.id)
        .then(response => {
          if (response.error == null) {
            this.data = response.data[0].strategyIndicators
            this.data.sort((x,y) => { return ( x.id > y.id ? 1 : -1 ) });
            this.data.forEach(x=>{
                x.inputFields.sort((x,y) => { return ( x.indicatorFieldId > y.indicatorFieldId ? 1 : -1 ) });
            })
            this.dialog = true
          }
        });
      this.getPairs();
      this.getTimings();
    },
    getTimings() {
      TimingService.get()
        .then(response => {
          if (response.error == null) {
            this.timings = response.data
          }
        });
    },
    getPairs() {
      PairService.get()
        .then(response => {
          if (response.error == null) {
            this.pairs = response.data
          }
        });
    },
    getIndicatorsToAdd() {
      IndicatorService.get()
        .then(response => {
          if (response.error == null) {
            this.indicators = response.data
            this.dialog_indicator = true
          }
        });
    },
    addEvent() {
      this.dialog_indicator = false;
      StrategyService.get(this.id)
        .then(response => {
          if (response.error == null) {
            this.data = response.data[0].strategyIndicators
            this.dialog = true
          }
        });
    },
    remove() {
      StrategyService.delete(this.id).then(()=>{
        this.$emit('on-remove');
      });
    },
    test() {
      var strat :Strategy = {
        id: this.id,
        name: this.name,
        pairId: this.pair,
        isPublic: null,
        timingId: this.timing,
        isLong: null,
        isShort: null,
        leverage: this.leverage,
        strategyIndicators: []
      };
      this.loading = true;
      TestService.get(strat).then((res)=>{
        var FILE = URL.createObjectURL(res);
        var docUrl = document.createElement('a') as HTMLAnchorElement;
        docUrl.download = 'hamlet.xlsx';
        docUrl.style.display = 'none';
        docUrl.href = FILE;
        docUrl.setAttribute('download', 'hamlet.xlsx');
        document.body.appendChild(docUrl);
        docUrl.click();
        document.body.removeChild(docUrl);
        this.loading = false;
      }).catch(()=>{
        this.loading = false;
      })
    },
    beautify() {
      var strat :Strategy = {
        id: this.id,
        name: this.name,
        pairId: this.pair,
        isPublic: null,
        timingId: this.timing,
        isLong: null,
        isShort: null,
        leverage: this.leverage,
        strategyIndicators: []
      };
      this.loading = true;
      var t = strat.leverage;
      strat.leverage = this.generationsCnt;
      TestService.patch(strat).then((res)=>{
        var FILE = URL.createObjectURL(res);
        var docUrl = document.createElement('a') as HTMLAnchorElement;
        docUrl.download = 'hamlet.xlsx';
        docUrl.style.display = 'none';
        docUrl.href = FILE;
        docUrl.setAttribute('download', 'hamlet.xlsx');
        document.body.appendChild(docUrl);
        docUrl.click();
        document.body.removeChild(docUrl);
        strat.leverage = t;
        this.loading = false;
      }).catch(()=>{
        strat.leverage = t;
        this.loading = false;
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.strategy_card {
  transition: box-shadow 0.3s;
  display: flex;
  align-items: center;
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
    list-style-type: none;
  padding:4.75px 0;
  margin:0px 2px;
  flex: 0 0 30%;
  }

  &__remove {
    line-height: 21px;
  list-style: none;
  flex: 0 0 16.33%;
  margin:0px 2px;
  padding:10px 0;
  }

  &__test {
    line-height: 21px;
  list-style: none;
  flex: 0 0 16.33%;
  margin:0px 2px;
  padding:10px 0;
  }

  &__setup {
    line-height: 21px;
    list-style: none;
    flex: 0 0 16.33%;
  margin:0px 2px;
    padding:10px 0;
  }

  &__timing {
    font-size: 21px;
    overflow: hidden;
    list-style: none;
    flex: 0 0 33.333333%;
  }

  &__pair {
      font-size: 21px;
      line-height: 21px;
      overflow: hidden;
    list-style: none;
    flex: 0 0 33.333333%;
  }

  &__leverage {
      font-size: 21px;
      line-height: 21px;
      overflow: hidden;
    list-style: none;
    flex: 0 0 33.333333%;
  }

  &__value {
    font-size: 21px;
  flex: 0 0 15%;
    margin-left: 20px;
    text-align: right;
  }

  &__parameters {
    display: flex;
    align-items: center;
  }

  &__add {
    margin-top: 5px;
    margin-bottom: 5px;
  }
}
</style>
