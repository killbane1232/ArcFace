<template>
  <div class="indicator_card">
    <v-btn  class="indicator_card__name" v-on:click.native="add()">
      {{ name }}
    </v-btn>
  </div>
</template>

<script lang="ts">
import { IndicatorService, StrategyIndicator } from '@/api';

export default {
  name: 'IndicatorCard',
  props: {
    id: {
      type: Number,
      default: 0
    },
    stratId: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: 'Название индикатора'
    },
  },
  methods : {
    add() {
      var si : StrategyIndicator = {
        id : this.id,
        strategyId : this.stratId,
        indicatorId : this.id,
        indicator : null,
        isExit : false,
        name : this.name,
        inputFields : []
      }
      IndicatorService.add(si).then(()=>{
        this.$emit("on-add");
      });
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
li {
  display: inline-block;
  margin: 0 10px;
}
.indicator_card {
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  border: 1px solid #f5f5f5;
  border-radius: 5px;
  margin-bottom: 5px;
  width: 100%;

  &__name {
    font-size: 31px;
    list-style: none;
    flex: 0 0 33.333333%;
  width: 100%;
  }
}
</style>
