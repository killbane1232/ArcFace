<template>
  <div class="input_field_card" onclick="dialog = true">
    <li  class="input_field_card__name">
      {{ name }}
    </li >
    <li class="input_field_card__value">
    <v-text-field
  v-model="newValue"
  hide-details
  single-line
  type="number"/>
    </li >
    <li>
      <v-btn v-on:click.native="undo">
        Undo
      </v-btn>
    </li>
  </div>
</template>

<script lang="ts">
import { InputField } from '@/api';


export default {
  name: 'InputFieldCard',
  props: {
    fieldId: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: 'Название индикатора'
    },
    value: {
      type: Number,
      default: false
    }
  },
  methods: {
    undo() {
      this.newValue = this.value;
    },
    save() {
      if ((Math.abs(Math.round(this.newValue) - this.value) > 0.01)) {
        var res : InputField = {
          indicatorFieldId : this.fieldId,
          name : this.name,
          intValue : Math.round(this.newValue),
          floatValue : (Math.abs(Math.round(this.newValue) - this.newValue) > 0.01 ? this.newValue : null)
        }
        return res;
      }
      return null;
    }
  },
  data() {
    return {
      newValue: this.value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1, h2 {
  font-weight: normal;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.input_field_card {
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  border: 1px solid #f5f5f5;
  border-radius: 5px;

  &__name {
    font-size: 21px;
    list-style: none;
    flex: 0 0 33.333333%;
    text-align: left;
  }

  &__value {
    font-size: 21px;
    color: gray;
  flex: 0 0 33.333333%;
    margin-left: 20px;
    text-align: right;
  }
}
</style>
