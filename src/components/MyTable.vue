<script setup lang="ts">
import { computed, ref } from 'vue';
import { ElTable, ElTableColumn, ElButton, ElSelect, ElOption } from 'element-plus';
import { CopyDocument } from '@element-plus/icons-vue'
import IpRow from './table/IpRow.vue';
import StatusRow from './table/StatusRow.vue';
import { useIpStore } from '@/store/ip';

const ipStore = useIpStore()

const selected = ref<number[]>([])
const sortDir = ref<string>('')

const table = ref()

const deleteMultiple = computed(() => {
    return selected.value.length >= 2 ? true : false
})

const sort = () => {
    table?.value.sort('country', sortDir.value)
}
</script>

<template>
    <el-table
        class="el-table--disable-row-hover"
        :data="ipStore.tableData"
        :border="true"
        :defaultSort="{ prop: 'country', order: 'ascending' }"
        stripe
        ref="table"
    >
        <template #empty>
            No data added yet
        </template>
        <!-- не понял, как отсюда пушить в массив (обычный чекбокс нормально ведет себя) -->
        <!-- реализовал построчное удаление через иконку при ховере -->
        <el-table-column
            type="selection"
            prop="id"
        />
        <el-table-column label="IP">
            <template #header>
                <div class="flex">
                    <span>IP</span>
                    <el-button
                        v-if="deleteMultiple"
                        class="delete-all"
                        text
                    >
                        Удалить выбранные
                    </el-button>
                </div>
            </template>
            <template #default="scope">
                <IpRow
                    :icon="CopyDocument"
                    :country="`${scope.row.country}`"
                    :ip="scope.row.ip"
                    :id="scope.row.id"
                />
            </template>
        </el-table-column>
        <el-table-column
            prop="country"
            label="Country"
        >
            <template #header>
                <div class="flex">
                    <span>Country</span>
                    <el-select
                        v-model="sortDir"
                        placeholder="Sort by"
                        class="select"
                        @change="sort"
                    >
                        <el-option
                            label="A-Z"
                            value="ascending"
                        />
                        <el-option
                            label="Z-A"
                            value="descending"
                        />
                    </el-select>
                </div>
            </template>
        </el-table-column>
        <el-table-column
            prop="city"
            label="City/Town"
        />
        <el-table-column
            prop="status"
            label=""
            width="50"
        >
            <template #default="scope">
                <status-row :status="scope.row.status" />
            </template>
        </el-table-column>
    </el-table>
</template>

<style scoped lang="scss">
.flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.delete-all {
    background-color: rgba(pink, .3);
    color: darkred;
    padding: 5px 10px;
    height: auto;
    font-size: 15px;
    line-height: .8em;
}

.select {
    width: 40%;
}
</style>