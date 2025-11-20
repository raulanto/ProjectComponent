<template>
    <main class="flex flex-col space-y-6">
        <ResponsivePreview size-type="xl" :code="kpiCode">
            <kpi-simple/>
        </ResponsivePreview>


        <ResponsivePreview size-type="sm" >
            <!-- Total Orders -->
            <kpi-chart
                title="Total orders"
                value="1,054"
                periodChange="56.4% Past 30 days"
                today-change="+330 today"
                change-type="up"
                :sparkline-data="ordersData"
                sparkline-color="#10b981"
                footer-text="20 total • 04 Apr, 2025"
            >
            </kpi-chart>
        </ResponsivePreview>

        <responsive-preview>
            <kpi-data/>


        </responsive-preview>
    </main>
</template>

<script lang="ts" setup>
import KpiSimple from "~/components/ui/card/kpi-simple.vue";
import kpiCode from "~/components/ui/card/kpi-simple.vue?raw"
import KpiChart from "~/components/ui/card/kpi-chart.vue";
import PremiumKpiCard from "~/components/ui/card/PremiumKpiCard.vue";
import KpiData from "~/components/kpi-data.vue";


const ordersData = [320, 350, 380, 360, 420, 480, 520, 580, 650, 720, 780, 850, 920, 980, 1020, 1054]


</script>

<style></style>
