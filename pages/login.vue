<template>
    <div>
        <div class="container mx-auto p-4 md:w-1/2 md:mx-auto">
      <form
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        @submit.prevent="login"
        >
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Имя пользователя
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Имя пользователя"
            v-model="form.username"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Пароль
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Пароль"
            v-model="form.password"
          />
        </div>
        <div class="flex justify-center">
          <button
            class="bg-eurasia hover:bg-eurasia-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Войти
          </button>
        </div>
      </form>
    </div>
    </div>
</template>

<script setup>
    const router = useRouter();

    const form = reactive({
        username: null,
        password: null
    });

    async function login() {
        const res = await useFetch(import.meta.env.VITE_API_URL + '/login', {
          method: 'POST',
          body: JSON.stringify({
            username: form.username,
            password: form.password,
          }),
          headers: { 'Content-Type': 'application/json' },
        })
        let data = unref(res.data);
        const token = data.access_token;
        window.localStorage.setItem('auth_token', token);
        router.push({ path: "/" });
    }
</script>