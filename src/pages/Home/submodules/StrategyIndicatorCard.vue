<template>
  <div class="strategy_indicator_card" onclick="dialog = true">
    <li  class="strategy_indicator_card__name">
      {{ name }}
    </li >
    <li class="strategy_indicator_card__isExit">
      IsExit: {{ isExit }}
    </li >
    <InputFieldCard
    v-for="field in inputFields"
    :key="field.indicatorFieldId"
    :name="field.name"
    :value="field.floatValue?field.floatValue:field.intValue"
    />
    <v-spacer></v-spacer>
  </div>
</template>

<script lang="ts">
import { InputField, StrategyIndicator } from '@/api';
import StrategyService from '@/api/api-services/strategy-service/strategyService';
import InputFieldCard from './InputFieldCard.vue'

export default {
  name: 'StrategyIndicatorCard',
  components: {InputFieldCard},
  props: {
    id: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: 'Название индикатора'
    },
    isExit: {
      type: Boolean,
      default: false
    },
    inputFields: {
      type:Array<InputField>,
      default: null
    }
  },
  data () {
    return {
      dialog: false,
      data: Array<StrategyIndicator>()
    }
  },
  methods : {
    refresh() {
    StrategyService.get(this.id)
      .then(response => (this.data = response.data[0].strategyIndicators));
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
.strategy_indicator_card {
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
  }

  &__isExit {
    font-size: 21px;
    color: gray;
    overflow: hidden;
    list-style: none;
    flex: 0 0 33.333333%;
    text-align: right;
    margin-right: 0;
  }
}
</style>
