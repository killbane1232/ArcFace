<template>
  <div class="account_card">
    <div class="account_card__name"> {{name}} </div>
    <v-checkbox label="IsActive" v-model="newIsActive" class="account_card__is_active"/>
    <v-select v-model="newStrategyId" :items="strategies" item-title="name"  item-value="id" label="Strategy" class="account_card__strategy"/>
    <v-btn class="account_card__save" v-on:click.native="save()">Save</v-btn>
  </div>
</template>

<script lang="ts">
import { Account, AccountService, Strategy } from '@/api';

export default {
  name: 'AccountCard',
  props: {
    id: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: 'Name'
    },
    isActive: {
      type: Boolean,
      default: false
    },
    platformId: {
      type: Number,
      default: 0
    },
    strategyId: {
      type: Number,
      default: 0
    },
    strategies: {
      type: Array<Strategy>,
      default: 0
    }
  },
  data () {
    return {
      newIsActive: this.isActive,
      newStrategyId: this.strategyId,
    }
  },
  methods : {
    save() {
      var account :Account = {
        id: this.id,
        platformId: this.platformId,
        name: this.name,
        isActive: (this.isActive == this.newIsActive ? null: this.newIsActive),
        strategyId: (this.strategyId == this.newStrategyId ? null: this.newStrategyId),
        key: null,
        secret: null
      };
      AccountService.patch(account).then(()=>
        this.$emit('on-update')
      );
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.account_card {
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
    flex: 0 0 40%;
    margin-left: 5px;
  }

  &__is_active {
    font-size: 21px;
    flex: 0 0 20%;
    margin-right: 10px;
  }
  &__strategy {
    font-size: 21px;
    flex: 0 0 20%;
    margin-right: 10px;
  }
  &__save {
    font-size: 21px;
    flex: 0 0 15%;
    margin-right: 10px;
  }
}
</style>
