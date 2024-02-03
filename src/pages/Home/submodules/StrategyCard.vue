<template>
  <div class="strategy_card" >
    <ul>
    <li  class="strategy_card__name">
      {{ name }}
    </li >
    <li  class="strategy_card__pair">
      {{ pair }}
    </li >
    <li class="strategy_card__timing">
      {{ timing }}
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
          <StrategyIndicatorCard 
            v-for="stratI in data"
            :key="stratI.id"
            :id="stratI.id"
            :name="stratI.name"
            :isExit="stratI.isExit"
            :inputFields="stratI.inputFields"
            :stratId="stratI.strategyId"
            ref="data"/>
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
    </li></ul>
  </div>
</template>

<script lang="ts">
import { Strategy, StrategyIndicator } from '@/api';
import StrategyService from '@/api/api-services/strategy-service/strategyService';
import StrategyIndicatorCard  from './StrategyIndicatorCard.vue';
export default {
  name: 'StrategyCard',
  components: {StrategyIndicatorCard},
  props: {
    id: {
      type: Number,
      default: 0
    },
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
  data () {
    return {
      dialog: false,
      data: Array<StrategyIndicator>()
    }
  },
  methods : {
    save() {
      var strat :Strategy = {
        id: this.id,
        name: this.name,
        pairId: null,
        isPublic: null,
        timingId: null,
        isLong: null,
        isShort: null,
        leverage: null,
        strategyIndicators: []
      };
      for(var i in this.data) {
        strat.strategyIndicators?.push((this.$refs['data'] as any)[i].save() as StrategyIndicator);
      }
      StrategyService.patch(strat);
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
