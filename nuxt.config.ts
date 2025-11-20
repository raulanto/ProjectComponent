// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: ['@vueuse/nuxt', '@nuxt/ui', 'nuxt-shiki','@nuxtjs/mdc'],
    css: ['~/assets/css/main.css'],
    mdc: {
        highlight: {
            theme: {
                default: 'github-dark',
                dark: 'github-dark',
                light: 'github-light'
            },
            langs: [
                'vue',
                'typescript',
                'javascript',
                'html',
                'css',
                'bash',
                'json'
            ]
        }
    }
})