<script setup lang="ts">
import { useIpStore } from '@/store/ip';
import { useRoute } from 'vue-router';

const route = useRoute()
const ipStore = useIpStore()

const id = route.params.id
const item = ipStore.mappedData.get(+id as number) 
</script>

<template>
    <ul>
        <!-- под ккеи можно и индексы, тк список статичный -->
        <li v-for="(value, key, index) in item" :key="index">
            {{ key }} : {{ value }}
        </li>
    </ul>
</template>

<style scoped>

</style>