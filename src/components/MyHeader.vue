<script setup lang="ts">
import { ref } from 'vue';
import { ElInput, ElForm, ElNotification } from 'element-plus';
import { Search } from '@element-plus/icons-vue'
import { useIpStore } from '@/store/ip';
import { useRouter } from 'vue-router';

const ipStore = useIpStore()
const router = useRouter()

const input = ref<string>('')

const submit = () => {
    try {
    ipStore.addIp(input.value)
    router.push({ name: 'table' })
  } catch (error) {
    console.log(error);
    
    ElNotification({
      title: 'Empty IP',
      //@ts-expect-error можно было бы сделать кастомный класс и протипизировать, но это больше к беку история
      message: error.message,
      type: 'error'
    })
  }
}
</script>

<template>
    <div class="header">
        <div class="header--wrapper">
            <router-link
                :to="{ name: 'home' }"
                class="header__link"
            >
                <h1>IP-PN.COM</h1>
            </router-link>
            <el-form
                size="large"
                @submit.prevent="submit"
            >
                <el-input
                    v-model="input"
                    class="header__input"
                    placeholder="Enter IP address"
                    type="text"
                    :prefix-icon="Search"
                />
            </el-form>
            <nav class="header__nav">
                <router-link
                    class="header__nav--item"
                    :to="{ name: 'home' }"
                >
                    Search tab
                </router-link>
                <router-link
                    class="header__nav--item"
                    :to="{ name: 'table' }"
                >
                    Table
                </router-link>
                <a
                    class="header__nav--item"
                    href="#"
                >Log in</a>
            </nav>
        </div>
    </div>
</template>

<style scoped lang="scss">
.header {
    background-color: #ddd;
    margin-bottom: 100px;
    border-radius: 0 0 12px 12px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);

    &--wrapper {
        padding: 20px;
        margin: 0 auto;

        max-width: 1400px;

        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 10px;
    }

    &__link {
        text-decoration: none;
        color: currentColor;
    }

    &__nav {
        display: flex;
        gap: 20px;
        align-items: center;
        justify-content: flex-end;

        &>* {
            text-decoration: none;
            color: currentColor;

            &:last-child {
                font-weight: 700;
            }
        }
    }
}
</style>