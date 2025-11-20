<template>
    <UTabs :items="items" variant="link" class="gap-4 w-full bg-muted rounded-lg p-2">
        <template #component="{ item }">
            <UCard :ui="{ body: { padding: '' } }" class="">
                <template #header>
                    <div class="  w-full">
                        <div class="flex items-center justify-between flex-wrap gap-4 w-full">
                            <UserMenu></UserMenu>
                            <div class="flex items-center gap-4 flex-wrap">
                                <!-- Toggle de centrado -->
                                <UButton @click="centered = !centered" size="md"
                                    :variant="centered ? 'solid' : 'soft'">
                                    <template #leading>
                                        <Icon
                                            :name="centered ? 'i-heroicons-arrows-pointing-in' : 'i-heroicons-arrows-pointing-out'"
                                            class="w-4 h-4" />
                                    </template>
                                    Center [{{ centered ? '1' : '0' }}]
                                </UButton>

                                <!-- Botones de tamaño -->
                                <UFieldGroup size="md" variant="soft">
                                    <UButton v-for="(sizeData, key) in sizes" :key="key"
                                        :variant="size === key ? 'solid' : 'soft'" @click="size = key">
                                        {{ sizeData.label }}
                                    </UButton>
                                </UFieldGroup>
                            </div>
                        </div>
                    </div>
                </template>

                <div class=" transition-all duration-300 min-h-70 "
                    :class="{ 'flex items-center justify-center h-full': centered }">
                    <div class="@container/viewer    transition-all duration-300 overflow-auto"
                        :style="{ width: sizes[size].width, maxWidth: '100%', maxHeight: '100%' }">

                        <div class=" scale-80">

                            <slot></slot>
                        </div>

                    </div>
                </div>

                <template #footer>
                    <div class="px-6 py-3 ">
                        <div class="flex items-center justify-between text-sm">
                            <span class="font-medium">Viewport: {{ sizes[size].width }}</span>
                            <span class="font-medium">Modo: {{ centered ? 'Centrado' : 'Normal' }}</span>
                            <span class="font-medium">Escala: scale-80</span>
                        </div>
                    </div>
                </template>
            </UCard>
        </template>

        <template #code="{ item }">
            <UCard class="">
                <template #header>
                    <div class="flex items-center justify-between px-4 py-2">
                        <div class="flex items-center gap-2">
                            <Icon name="i-lucide-code" class="w-5 h-5 text-secondary" />
                            <span class="text-sm font-semibold ">{{ filename }}</span>
                        </div>
                        <UButton @click="copyCode" size="xs" variant="ghost" :color="copied ? 'success' : 'neutral'">
                            <template #leading>
                                <Icon :name="copied ? 'i-lucide-check' : 'i-lucide-copy'" class="w-4 h-4" />
                            </template>
                            {{ copied ? 'Copiado!' : 'Copiar' }}
                        </UButton>
                    </div>
                </template>

                <!-- Código con Shiki -->
                <div class="overflow-x-auto">
                    <ClientOnly>

                        <Shiki v-if="code" :code="code" lang="js" class="text-sm" />


                        <pre v-else class="p-4  text-sm"><code>// No se proporcionó código</code></pre>

                        <template #fallback>
                            <pre class="p-4  text-sm"><code>{{ code || '// Cargando...' }}</code></pre>
                        </template>
                    </ClientOnly>
                </div>
            </UCard>
        </template>
    </UTabs>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TabsItem } from '@nuxt/ui'


const props = defineProps<{
    code?: string
    filename?: string
    sizeType?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
}>()


const items = [
    {
        label: 'Component',
        icon: 'i-lucide-eye',
        slot: 'component' as const
    },
    {
        label: 'Code',
        icon: 'i-lucide-code',
        slot: 'code' as const
    }
] satisfies TabsItem[]

const size = ref(props.sizeType || 'xl')
const centered = ref(true)
const copied = ref(false)

const sizes = {
    xs: { width: '320px', label: 'XS' },
    sm: { width: '640px', label: 'SM' },
    md: { width: '768px', label: 'MD' },
    lg: { width: '1024px', label: 'LG' },
    xl: { width: '1280px', label: 'XL' },
    full: { width: '100%', label: 'Full' }
}


const code = computed(() => props.code || '')
const filename = computed(() => props.filename || 'Component.vue')


const copyCode = async () => {
    try {
        await navigator.clipboard.writeText(code.value)
        copied.value = true
        setTimeout(() => {
            copied.value = false
        }, 2000)
    } catch (err) {
        console.error('Error al copiar:', err)
    }
}
</script>

<style scoped>
/* Ajustes para el código */
</style>