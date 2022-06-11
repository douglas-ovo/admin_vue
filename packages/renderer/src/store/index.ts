import { defineStore } from 'pinia'

const useStore = defineStore('main', {
    state: () => {
        return {
            counter: 0,
        }
    },
    actions: {
        increment() {
            this.counter++
        },
    }
})

export default useStore