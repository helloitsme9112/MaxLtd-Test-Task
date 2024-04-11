<script setup lang="ts">
import { ElInput, ElForm, ElButton, ElNotification } from 'element-plus';
import { ref } from 'vue';
import { useIpStore } from '@/store/ip';
import { useRouter } from 'vue-router';

const ipStore = useIpStore()
const router = useRouter()

const textarea = ref<string>('89.188.176.239')

const onSubmit = () => {
  try {
    ipStore.addIp(textarea.value)
    router.push({ name: 'table' })
  } catch (error) {
    ElNotification({
      title: 'Empty IP',
      //@ts-expect-error можно было бы сделать кастомный класс и протипизировать, но это больше к беку
      message: error.message,
      type: 'error'
    })
  }
}
</script>

<template>
  <el-form class="form">
    <el-input
      v-model="textarea"
      type="textarea"
      class="textarea"
      placeholder="Введите IP адреса"
      :autosize="{ minRows: 4 }"
      resize="none"
    />
    <el-button class="form__button" @click="onSubmit">Отправить</el-button>
  </el-form>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  max-width: 50%;

  &__button {
    padding: 20px;
    background-color: #ddd;
  }
}
</style>