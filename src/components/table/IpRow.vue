<script setup lang="ts">
import { ref, defineProps, ComponentPublicInstance } from 'vue';
import { ElIcon } from 'element-plus';
import { Delete } from '@element-plus/icons-vue'
import { useIpStore } from '@/store/ip';

const props = defineProps<{
    icon: ComponentPublicInstance
    country: string,
    ip: string,
    id: number
}>()

const ipStore = useIpStore()

const isShow = ref<boolean>(false)
const imgName = `${props.country}.svg`

const requireImage = (name: string) => {
    if (name === 'Waiting for country.svg') return
    return require(`@/assets/flags/${name}`);
}

const copy = () => {
    navigator.clipboard.writeText(props.ip)
    alert('copied text: ' + props.ip)
}

const onRemove = () => {
    ipStore.removeIp(props.id)
}
</script>

<template>
    <router-link
        class="wrapper"
        @mouseover="() => isShow = true"
        @mouseleave="() => isShow = false"
        :to="{
            name: 'detail',
            params: {
                id: id
            }
        }"
    >
        <img
            :src="requireImage(imgName)"
            :alt="`Flag of ${country}`"
        >
        <span>{{ ip }}</span>
        <div
            class="icon-wrapper"
            v-if="isShow"
        >
            <el-icon
                :size="15"
                color="darkred"
                class="icon"
                @click="onRemove"
            >
                <Delete />
            </el-icon>
            <el-icon
                class="icon"
                @click="copy"
            >
                <component :is="icon" />
            </el-icon>
        </div>
    </router-link>
</template>
<style scoped lang="scss">
.wrapper {
    display: flex;
    align-items: center;
    gap: 10px;

    color: black;
    text-decoration: none;
}

.icon-wrapper {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 5px;

    .icon {
        cursor: pointer;
    }
}
</style>