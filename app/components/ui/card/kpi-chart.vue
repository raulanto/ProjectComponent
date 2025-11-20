<!-- components/ShopifyStatsCard.vue -->
<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import {CategoryScale, Chart, Filler, LinearScale, LineController, LineElement, PointElement, Tooltip} from 'chart.js'

Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Filler, Tooltip)

interface Props {
    title: string
    value: string | number
    todayChange?: string          // ej: "+330 today"
    periodChange?: string         // ej: "56.4% Past 30 days"
    periodChangeUp?: boolean      // true = verde ↑, false = rojo ↓
    sparklineData: number[]
    sparklineColor?: string       // opcional: hex o var(--ui-success), etc.
    footerText?: string           // ej: "20 total • 04 Apr, 2025"
}

const props = withDefaults(defineProps<Props>(), {
    sparklineColor: 'rgb(16 185 129)',
    periodChangeUp: true
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const chart = ref<Chart | null>(null)

const initChart = () => {
    if (!canvasRef.value) return
    chart.value?.destroy()

    chart.value = new Chart(canvasRef.value, {
        type: 'line',
        data: {
            labels: props.sparklineData.map(() => ''),
            datasets: [{
                data: props.sparklineData,
                borderColor: cssColor("--ui-success"),
                backgroundColor: cssColor("--ui-success", 0.2),
                borderWidth: 2.5,
                tension: 0.42,
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: props.sparklineColor
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {mode: 'index', intersect: false},
            plugins: {
                legend: {display: false},
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    cornerRadius: 8,
                    displayColors: false,
                    padding: 12,
                    bodyFont: {size: 15, weight: 'bold'}
                }
            },
            scales: {x: {display: false}, y: {display: false}}
        }
    })
}

onMounted(initChart)
watch(() => props.sparklineData, initChart, {deep: true})
</script>

<template>
    <UPageCard
        highlight
        highlight-color="success"
        variant="outline"
        class="overflow-hidden "
        :ui="{
              root: 'overflow-hidden',
              container: 'p-6 pb-4 gap-y-6',
              body: 'flex flex-col'
        }"
    >
        <!-- Header: título + cambio de período -->
        <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-muted">{{ title }}</p>

            <div
                v-if="periodChange"
                class="flex items-center text-sm font-semibold"
                :class="periodChangeUp ? 'text-success' : 'text-error'"
            >
                <UIcon
                    :name="periodChangeUp ? 'i-heroicons-arrow-up-right' : 'i-heroicons-arrow-down-right'"
                    class="w-4 h-4 mr-1"
                />
                {{ periodChange }}
            </div>
        </div>

        <!-- Valor principal + cambio de hoy -->
        <div class="flex items-baseline gap-4">
            <p class="text-4xl font-extrabold">
                {{ value }}
            </p>
            <p v-if="todayChange" class="text-sm font-medium text-success">
                {{ todayChange }}
            </p>
        </div>

        <!-- Sparkline + footer -->
        <div class="relative -mx-6 -mb-6 mt-6 h-32 border-t border-default">
            <canvas ref="canvasRef" class="absolute inset-0 w-full h-full"/>

            <div
                v-if="footerText"
                class="absolute bottom-4 right-6 flex items-center text-xs text-muted"
            >
        <span
            class="inline-block w-2 h-2 rounded-full mr-1.5"
            :style="{ backgroundColor: sparklineColor }"
        />
                {{ footerText }}
            </div>
        </div>
    </UPageCard>
</template>