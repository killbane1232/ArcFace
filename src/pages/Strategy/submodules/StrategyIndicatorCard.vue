<template>
  <div class="strategy_indicator_card" onclick="dialog = true">
    <div class="strategy_parameters">
      <div class="strategy_parameters__name">{{ name }}</div>
      <v-checkbox label="IsExit" v-model="isExit" class="strategy_parameters__isExit"/>
      <v-btn v-on:click.native="remove()" class="strategy_parameters__isExit"> Remove </v-btn>
    </div>
    <InputFieldCard
    v-for="field in inputFields"
    :key="field.indicatorFieldId"
    :fieldId="field.indicatorFieldId"
    :name="field.name"
    :value="field.floatValue?field.floatValue:field.intValue"
    ref="data2"
    />
  </div>
</template>

<script lang="ts">
import { IndicatorService, InputField, StrategyIndicator } from '@/api';
import InputFieldCard from './InputFieldCard.vue'

export default {
  name: 'StrategyIndicatorCard',
  components: {InputFieldCard},
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
    inputFields: {
      type:Array<InputField>,
      default: null
    },
    isExitValue: {
      type:Boolean,
      default: false
    }
  },
  data () {
    return {
      dialog: false,
      data: Array<StrategyIndicator>(),
      isExit: this.isExitValue
    }
  },
  methods : {
    remove() {
      IndicatorService.delete(this.id).then(()=>{
        this.$emit('on-remove');
      });
    },
    save() {
      var si : StrategyIndicator = {
        id : this.id,
        strategyId : this.stratId,
        indicatorId : null,
        indicator : null,
        isExit : this.isExit,
        name : this.name,
        inputFields : []
      }
      for (var i in this.inputFields) {
        var res = ((this.$refs['data2'] as any)[i].save() as (InputField | null));
        if (res != null)
          si.inputFields.push(res);
      }
      return si;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.strategy_indicator_card {
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  border: 1px solid #f5f5f5;
  border-radius: 5px;
  margin-bottom: 5px;
  width: 100%;
}
.strategy_parameters {
  transition: box-shadow 0.3s;
  display: flex;
  align-items: center;

  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  border: 1px solid #f5f5f5;
  border-radius: 5px;
  margin-bottom: 5px;
  width: 100%;

  &__name {
    font-size: 31px;
    flex: 0 0 32.333333%;
    margin-left: 5px;
  }

  &__isExit {
    font-size: 21px;
    flex: 0 0 32.333333%;
    margin-right: 10px;
  }
}
</style>
