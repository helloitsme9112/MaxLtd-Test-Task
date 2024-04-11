import axios from "axios";
import { ElNotification } from "element-plus";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export type IPData = {
    query: string,
    status: 'success' | 'fail' | 'in progress',
    continent: string,
    continentCode: string,
    country: string,
    countryCode: string,
    region: string,
    regionName: string,
    city: string,
    district: string,
    zip: number,
    lat: number,
    lon: number,
    timezone: string,
    offset: string,
    currency: string,
    isp: string,
    org: string,
    as: string,
    asname: string,
    mobile: boolean,
    proxy: boolean,
    hosting: boolean
}

export const useIpStore = defineStore('ip', () => {
    // нужен для отрисовки детальной информации
    // для этого сразу собираем в new Map() для быстрого доступа по ключу
    const mappedData = ref<Map<number, IPData>>(new Map())

    // можно вынести в TableView, но при размаунте компонента будет новый расчет
    const tableData = computed(() => {
        const result: {
            id: number,
            ip: string,
            country: string,
            city: string,
            status: string
        }[] = []

        for (const item of mappedData.value) {
            result.push({
                id: item[0],
                ip: item[1].query,
                country: item[1].country,
                city: item[1].city,
                status: item[1].status
            })
        }

        return result.sort((a, b) => {
            if (a.country > b.country) return 1

            if (a.country < b.country) return -1

            return 0
        })
    })

    const addIp = (ip: string) => {
        if (!ip) throw new Error('IP has not been passed')

        const id = new Date().getTime()

        // по-идее я должен создать временный объект, который сразу бы уехал в computed выше со статусом in Progress
        // но что-то идет не так и я не понял что
        mappedData.value.set(id, {
            query: ip,
            status: 'in progress',
            continent: '',
            continentCode: '',
            country: 'Waiting for country',
            countryCode: '',
            region: '',
            regionName: '',
            city: 'Waiting for city',
            district: '',
            zip: 0,
            lat: 0,
            lon: 0,
            timezone: '',
            offset: '',
            currency: '',
            isp: '',
            org: '',
            as: '',
            asname: '',
            mobile: false,
            proxy: false,
            hosting: false
        })

        try {
            axios.get<IPData>(`http://ip-api.com/json/${ip}`).then((r) => {
                if (r.data.status === 'fail') {
                    ElNotification({
                        title: 'Whoops!',
                        message: 'Invalid IP',
                        type: 'error'
                    })

                    return false
                }

                mappedData.value.set(id, r.data)

                return mappedData
            })
        } catch (error) {
            ElNotification({
                title: '500',
                message: 'Sorry, service is unavailible :(',
                type: 'error'
            })
        }
    }

    const removeIp = (id: number) => {
        if (!id) return

        mappedData.value.delete(id)
    }

    return {
        mappedData,
        tableData,
        addIp,
        removeIp
    }
})