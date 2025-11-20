<script setup lang="ts">
import type {NavigationMenuItem} from "@nuxt/ui";

const navItems: NavigationMenuItem[] = [];
</script>

<template>
    <UApp>
        <u-header mode="slideover">
            <template #left>
                <u-user name="Vue Component" to="/" :avatar="{ src: '' }"></u-user>
            </template>
            <template #right>
                <UColorModeButton></UColorModeButton>
                <UT class="ml-2"></UT>
            </template>
            <u-navigation-menu :items="navItems"></u-navigation-menu>
            <template #body>
                <u-navigation-menu :items="navItems"></u-navigation-menu>
            </template>
        </u-header>
        <UMain>
            <div class="mx-20 my-2">

                <NuxtPage></NuxtPage>
            </div>

        </UMain>
    </UApp>
</template>

<style scoped>

</style>