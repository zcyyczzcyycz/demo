<script lang="ts">
import { defineComponent } from 'vue'
import { useCounterStore } from '@/ts/store.ts'

export default {
    props: {
        count: Number
    },
    data() {
        return {
            counterStore: useCounterStore()

        }
    },
    methods: {
        add() {

            // this 会自动有类型，this.msg 也能识别
        }
    }
}
</script>

<template>
    <div>
        <p>count: {{ count }}</p>
        <p>storeCount: {{ counterStore.count }}</p>
    </div>
</template>
