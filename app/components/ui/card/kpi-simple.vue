<script setup lang="ts">

const value = ref(50);
</script>

<template>
    <div
        class="grid gap-4 grid-cols-1 @[420px]:grid-cols-2 @[768px]:grid-cols-2 @[1024px]:grid-cols-3 @[1280px]:grid-cols-4 @sm:gap-6 p-2 @sm:p-0">
        <!-- Tarjeta 1: KPI con Aumento -->
        <UPageCard
            class="neutral rounded-lg @sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            spotlight spotlight-color="primary">
            <div class="flex justify-between items-start">
                <div class="flex flex-col space-y-1">
                    <span class="text-xs @sm:text-sm font-medium text-dimmed">
                        Ventas Totales
                    </span>
                    <span class="text-2xl @sm:text-3xl font-bold"> $48,250.00 </span>
                </div>
                <!-- Icono de KPI -->
                <UIcon name="i-lucide-arrow-up-right" class="size-10 bg-success" />
            </div>
            <div class="mt-3 @sm:mt-4">
                <span class="inline-flex items-center text-xs @sm:text-sm font-semibold text-success">
                    <UIcon name="i-lucide-circle-check" class="size-5 bg-success" />
                    +12.5% vs. mes pasado
                </span>
            </div>
        </UPageCard>

        <!-- Tarjeta 2: KPI con Descenso -->
        <UPageCard class="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            spotlight spotlight-color="primary">
            <div class="flex justify-between items-start">
                <div class="flex flex-col space-y-1">
                    <span class="text-xs @sm:text-sm font-medium text-dimmed">
                        Nuevos Usuarios
                    </span>
                    <span class="text-2xl @sm:text-3xl font-bold"> 1,240 </span>
                </div>
                <!-- Icono de KPI -->
                <UIcon name="i-lucide-arrow-down-right" class="size-10 bg-error" />
            </div>
            <div class="mt-3 @sm:mt-4">
                <span class="inline-flex items-center text-xs @sm:text-sm font-semibold text-error">
                    <UIcon name="i-lucide-circle-alert" class="size-5 bg-error" />
                    -3.2% vs. semana pasada
                </span>
            </div>
        </UPageCard>

        <!-- Tarjeta 3: KPI con Barra de Progreso -->
        <UPageCard class="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            spotlight spotlight-color="primary">
            <div class="flex flex-col space-y-2">
                <span class="text-xs @sm:text-sm font-medium text-dimmed">
                    Tasa de Conversión
                </span>
                <span class="text-2xl @sm:text-3xl font-bold"> 25.8% </span>

                <!-- El ancho (width) representa el progreso -->
                <UProgress v-model="value" />

                <span class="text-xs @sm:text-sm text-dimmed text-right">
                    Objetivo: 30%
                </span>
            </div>
        </UPageCard>

        <!-- Tarjeta 4: KPI Métrica Sencilla -->
        <UPageCard class="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            spotlight spotlight-color="primary">
            <div class="flex flex-col items-center justify-center h-full text-center">
                <span class="text-xs @sm:text-sm font-medium text-dimmed">
                    Tasa de Rebote
                </span>
                <span class="text-3xl @sm:text-4xl font-bold text-primary my-2">
                    42%
                </span>
                <span class="text-xs @sm:text-sm text-dimmed"> Últimos 30 días </span>
            </div>
        </UPageCard>
    </div>
</template>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
