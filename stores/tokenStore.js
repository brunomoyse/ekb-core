import { defineStore } from 'pinia';
const config = useRuntimeConfig();

export const useTokenStore = defineStore('token', {
    state: () => ({
        accessToken: null,
    }),
    actions: {
      setAccessToken(accessToken) {
        console.log('accessToken', accessToken);
        this.accessToken = accessToken;
      },
    },
});