import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const isLoggedIn = ref(false)
    const username = ref('Guest')

    function login(name) {
        isLoggedIn.value = true
        username.value = name
    }

    function logout() {
        isLoggedIn.value = false
        username.value = 'Guest'
    }

    return { isLoggedIn, username, login, logout }
})