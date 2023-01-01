export const useToken = () => {
    return window.localStorage.getItem('auth_token');
};

export default defineNuxtRouteMiddleware((to, from) => {
    let token = useToken();
    if (!token && to.name !== 'login') {
       return navigateTo('/login')
    }
})