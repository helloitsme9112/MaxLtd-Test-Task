<script setup lang="ts">
import { defineProps } from 'vue';
import { Close, Check, Refresh } from '@element-plus/icons-vue'
import { ElTooltip } from 'element-plus';

defineProps<{
    status: 'in progress' | 'fail' | 'success'
}>()

const colors = {
    'in progress': 'yellow',
    'fail': 'red',
    'success': 'green'
}
</script>

<template>
    <div class="wrapper">
        <el-icon>
            <el-tooltip :content="status">
                <Refresh
                    v-if="status === 'in progress'"
                    :color="colors['in progress']"
                />
                <Check
                    v-else-if="status === 'success'"
                    :color="colors.success"
                />
                <Close
                    v-else
                    :color="colors.fail"
                />
            </el-tooltip>
        </el-icon>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>