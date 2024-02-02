<template>
  <div class="input_field_card" onclick="dialog = true">
    <li  class="input_field_card__name">
      {{ name }}
    </li >
    <li class="input_field_card__value">
      {{ value }}
    </li >
  </div>
</template>

<script lang="ts">
export default {
  name: 'InputFieldCard',
  props: {
    id: {
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
