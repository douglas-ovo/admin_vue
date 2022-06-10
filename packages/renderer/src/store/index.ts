import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
    state: () => {
        return {
            userinfo: null
        }
    },
    actions: {
        async getUserinfo() {
            // this.userinfo = 
        }
    },
})