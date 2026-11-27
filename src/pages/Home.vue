<template>
    <label for="input">输入一个数：</label>
    <input type="text" id="input" v-model="state.count" v-if="state.info.age" />
    <span v-once>count: {{ state.count }}</span>
    <button id="addBtn" @click="increment">add1</button>
    <button id="lessBtn" @click="decrement">less</button>
    <Test :count="state.count" />
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import Test from '@/components/Test.vue'
import { useCounterStore } from '@/ts/store.ts'

const counterStore = useCounterStore()
console.log('counterStore:', counterStore)
const count = ref(0)
const state = reactive({ count: 0, info: { name: 'zcy', age: 18 } })
watch(state, (newValue) => {
    console.log('count changed:', state.count, window.location.hash, window.location.hash.slice(1))

})
function increment() {
    counterStore.count++
    state.count++
    state.info.age = 18

}

function decrement() {
    state.count--
    state.info.age = 0
}
</script>

<style module>
:global(#addBtn) {
    background: blue !important;
}
</style>