<template>
  <div class="strategy_card" >
    <ul>
      <li  class="strategy_card__name">
        {{ name }}
      </li >
      <li class="strategy_card__pair">
        {{ timing_name }}
      </li >
      <li class="strategy_card__timing">
        {{ pair_name }}
      </li >
      <li class="strategy_indicator_card__isExit">
        <v-btn v-on:click.native="remove()"> Remove </v-btn>
      </li >
      <li class="strategy_indicator_card__isExit">
        <v-btn v-on:click.native="test()"> Test </v-btn>
      </li >
      <li>
        <v-btn v-on:click.native="getIndicators()">
          Setup
        </v-btn>
        <v-dialog
            v-model="dialog"
            width="75%"
          >
          <v-card>
            <li  class="strategy_card__name">
              {{ name }}
            </li >
            <li class="strategy_card__pair">
              <v-select v-model="pair" :items="pairs" item-title="name"  item-value="id" label="Pairs"/>
            </li >
            <li class="strategy_card__timing">
              <v-select v-model="timing" :items="timings" item-title="name"  item-value="id" label="Timings"/>
            </li >
            <li class="strategy_card__timing">
              <v-text-field v-model="leverage" 
                hide-details
                single-line
                type="number"/>
            </li >
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
            <v-btn v-on:click.native="getIndicatorsToAdd()">
              Add
            </v-btn>
            <li>
              <v-card-actions>
                <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
              </v-card-actions>
            </li >
            <li>
              <v-card-actions>
                <v-btn color="primary" block @click="dialog = false; save()">Save</v-btn>
              </v-card-actions>
            </li >
          </v-card>
        </v-dialog>
        <v-dialog
            v-model="dialog_indicator"
            width="50%"
        >
          <v-card>
            <IndicatorCard 
              v-for="stratI in indicators"
              :key="stratI.id"
              :id="stratI.id"
              :name="stratI.name"
              :stratId="id"
              ref="data"
              @on-add="addEvent()"/>
              <li>
                <v-card-actions>
                  <v-btn color="primary" block @click="dialog_indicator = false">Cancel</v-btn>
                </v-card-actions>
              </li >
          </v-card>
        </v-dialog>
      </li>
    </ul>
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
      dialog_timing: false,
      dialog_pair: false,
      data: Array<StrategyIndicator>(),
      indicators: Array<Indicator>(),
      timings: Array<Timing>(),
      pairs: Array<Pair>(),
      pair_name: '',
      timing_name: '',
      pair:this.pair_value,
      timing:this.timing_value,
      leverage:this.leverage_value
    }
  },
  mounted() {
    this.getPairs();
    this.getTimings();
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
        .then(response => (this.data = response.data[0].strategyIndicators));
    },
    getIndicators() {
      StrategyService.get(this.id)
        .then(response => {
          console.log(response);
          if (response.error == null) {
            this.data = response.data[0].strategyIndicators
            this.dialog = true
          }
        });
    },
    getTimings() {
      TimingService.get()
        .then(response => {
          console.log(response);
          if (response.error == null) {
            this.timings = response.data
          }
        });
    },
    getPairs() {
      PairService.get()
        .then(response => {
          console.log(response);
          if (response.error == null) {
            this.pairs = response.data
          }
        });
    },
    getIndicatorsToAdd() {
      IndicatorService.get()
        .then(response => {
          console.log(response);
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
          console.log(response);
          if (response.error == null) {
            this.data = response.data[0].strategyIndicators
            this.dialog = true
          }
        });
    },
    pairEvent(id:number, name:string) {
      this.dialog_pair = false;
      this.pair = id;
      this.pair_name = name;
    },
    timingEvent(id:number, name:string) {
      this.dialog_timing = false;
      this.timing = id;
      this.timing_name = name;
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
      TestService.get(strat).then((res)=>{
        var FILE = window.URL.createObjectURL(res);
        var docUrl = document.createElement('x') as HTMLAnchorElement;
        docUrl.href = FILE;
        docUrl.setAttribute('download', 'hamlet.csv');
        document.body.appendChild(docUrl);
        docUrl.click();
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
    list-style-type: none;
    flex: 0 0 33.333333%;
    margin-bottom: 5px;
  }

  &__timing {
    font-size: 21px;
    color: gray;
    overflow: hidden;
  list-style: none;
  flex: 0 0 33.333333%;
  }

  &__pair {
    font-size: 21px;
    line-height: 21px;
    color: gray;
    overflow: hidden;
  list-style: none;
  flex: 0 0 33.333333%;
  }
}
</style>
