<script lang="ts">
import { defineComponent } from 'vue'

export default {
    props: {
        count: Number
    },
    data() {
        return {

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
        <p>about</p>
    </div>
</template>
