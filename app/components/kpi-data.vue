<script setup lang="ts">

import PremiumKpiCard from "~/components/ui/card/PremiumKpiCard.vue";
</script>

<template>
    <div class="grid gap-4 grid-cols-1 @[420px]:grid-cols-2 @[768px]:grid-cols-2 @[1024px]:grid-cols-3 @[1280px]:grid-cols-4 @sm:gap-6 p-2 @sm:p-0">
        <!-- Área -->
        <PremiumKpiCard
            title="Tráfico Web"
            value="78,2K"
            type="area"
            icon="i-heroicons-globe-alt"
            color="primary"
            :data="[30, 40, 25, 50, 45, 60, 55]"
        />

        <!-- Barras -->
        <PremiumKpiCard
            title="Registros Diarios"
            value="451"
            type="bar"
            icon="i-heroicons-user-group"
            color="secondary"
            icon-bg="bg-indigo-500/10 dark:bg-indigo-500/20"
            :data="[120, 150, 130, 180, 160, 200, 190]"
        />

        <!-- Dona -->
        <PremiumKpiCard
            title="Meta de Tareas"
            value="85%"
            type="doughnut"
            icon="i-heroicons-check-circle"
            color="success"
            :doughnut-data="[85, 15]"
        />

        <!-- Dona Multi -->
        <PremiumKpiCard
            title="Distribución"
            value="Multi"
            type="doughnut"
            icon="i-heroicons-chart-pie"
            color="info"
            :doughnut-data="[30, 20, 25, 25]"
            :doughnut-colors="['#3b82f6', '#10b981', '#f59e0b', '#ef4444']"
        />

        <!-- Línea -->
        <PremiumKpiCard
            title="Tasa de Rebote"
            value="21.4%"
            type="line"
            icon="i-heroicons-arrow-trending-down"
            color="error"
            :data="[25, 22, 24, 20, 21, 19, 21.4]"
        />
    </div>

</template>

<style scoped>

</style>