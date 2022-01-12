<script setup>
import { computed, ref } from 'vue';
let v = ref(10);
let v1 = ref(11);
const value = computed(() => {
  console.log('我被执行了');
  return v.value + 10 + v1.value;
});
const test1 = computed({
  a() {
    console.log(123);
  }
});
console.log(v);
console.log('你好', value);
function add() {
  v.value++;
  v1.value++;
}
</script>
<template>
  <div>
    {{ value }} {{ value }}
    <button @click="add">+</button>
  </div>
</template>
