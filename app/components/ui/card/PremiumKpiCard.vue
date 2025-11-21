
<!-- components/PremiumKpiCard.vue -->
<script setup lang="ts">
import {computed, onBeforeUnmount, onMounted, ref, watch} from 'vue'
import {
    ArcElement,
    BarController,
    BarElement,
    CategoryScale,
    Chart,
    DoughnutController,
    Filler,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Tooltip
} from 'chart.js'

Chart.register(
    LineController, LineElement, PointElement,
    BarController, BarElement,
    DoughnutController, ArcElement,
    CategoryScale, LinearScale, Filler, Tooltip
)

type ChartType = 'area' | 'bar' | 'doughnut' | 'line'

interface Props {
    title: string
    value: string | number
    type: ChartType
    data?: number[]
    doughnutData?: number[]
    doughnutColors?: string[]
    icon: string
    color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error'
}

const props = withDefaults(defineProps<Props>(), {
    color: 'primary',
    data: () => [],
    doughnutData: () => [85, 15]
})

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const colors = computed(() => ({
    line: isDark.value ? '#60a5fa' : '#3b82f6',
    areaBg: isDark.value ? 'rgba(96, 165, 250, 0.12)' : 'rgba(59, 130, 246, 0.1)',
    bar: '--ui-secondary',
    barHover: '--ui-secondary',
    doughnut: isDark.value ? '#4ade80' : '#22c55e',
    doughnutBg: isDark.value ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
    lineRed: isDark.value ? '#f87171' : '#ef4444'
}))

const canvasRef = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

const createChart = () => {
    if (!canvasRef.value) return
    chart?.destroy()

    const ctx = canvasRef.value.getContext('2d')!
    const c = colors.value

    const baseOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {display: false},
            tooltip: {
                mode: 'index' as const,
                intersect: false,
                backgroundColor: cssColor('--ui-bg-muted'),
                titleColor: isDark.value ? '#9ca3af' : '#4b5563',
                bodyColor: isDark.value ? '#f9fafb' : '#111827',
                cornerRadius: 8,
                padding: 10,
                displayColors: false,
                titleFont: {size: 12},
                bodyFont: {size: 14, weight: 'bold'}
            }
        },
        scales: {x: {display: false}, y: {display: false}}
    }

    // Área (línea con fill)
    if (props.type === 'area') {
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: props.data.map(() => ''),
                datasets: [{
                    data: props.data,
                    borderColor: c.line,
                    backgroundColor: c.areaBg,
                    borderWidth: 2.5,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6
                }]
            },
            options: baseOptions
        })
    }

    // Barras
    if (props.type === 'bar') {
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: props.data.map(() => ''),
                datasets: [{
                    data: props.data,
                    borderColor: cssColor(c.bar),
                    hoverBackgroundColor: cssColor(c.barHover),
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: baseOptions
        })
    }

    // Dona
    if (props.type === 'doughnut') {
        const bgColors = props.doughnutColors || (props.doughnutData?.length === 2 ? [c.doughnut, c.doughnutBg] : ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'])

        chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: props.doughnutData || [],
                    backgroundColor: bgColors,
                    borderWidth: 4,
                    borderColor: 'transparent',
                    borderRadius: 8
                }]
            },
            options: {...baseOptions, cutout: '75%'}
        })
    }

    // Línea simple
    if (props.type === 'line') {
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: props.data.map(() => ''),
                datasets: [{
                    data: props.data,
                    borderColor: c.lineRed,
                    borderWidth: 2.5,
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6
                }]
            },
            options: baseOptions
        })
    }
}

onMounted(createChart)
watch([colors, () => props.data, () => props.doughnutData, () => props.doughnutColors], createChart, {deep: true})
watch(() => colorMode.value, () => setTimeout(createChart, 50))
onBeforeUnmount(() => chart?.destroy())
</script>

<template>
    <UPageCard
        variant="subtle"
        class="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        :ui="{
      root: '  ',
      container: 'p-5 sm:p-6',
      body: 'flex flex-col gap-4'
    }"
    >
        <!-- Header: título + icono -->
        <div class="flex items-center justify-between w-full">
            <h3 class="text-sm font-medium text-muted">{{ title }}</h3>
                <UIcon :name="icon" :class="['size-9', `bg-${props.color}`]" />
        </div>

        <!-- Valor principal -->
        <div class="text-3xl sm:text-4xl font-bold  tracking-tight">
            {{ value }}
        </div>

        <!-- Gráfico -->
        <div :class="[
            'relative mt-4',
            type === 'doughnut' ? 'h-32 sm:h-36 flex justify-center items-center' : '-mx-6 -mb-6 h-22 sm:h-22'
        ]">
            <canvas
                v-if="type !== 'doughnut'"
                ref="canvasRef"
                class="absolute inset-0 h-full w-full"
            />

            <div v-else class="h-full w-full flex items-center justify-center">
                 <div class="h-28 w-28 sm:h-32 sm:w-32">
                    <canvas ref="canvasRef"/>
                </div>
            </div>
        </div>
    </UPageCard>
</template>