<script setup lang="ts">
import type {DropdownMenuItem} from "@nuxt/ui";

defineProps<{
    collapsed?: boolean;
}>();


const appConfig = useAppConfig();

const colors = [
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
];
const neutrals = ["slate", "gray", "zinc", "neutral", "stone"];

const user = ref({
    name: "raulanto",
    avatar: {
        src: "https://avatars.githubusercontent.com/u/74162376?v=4",
        alt: "Raul antonio",
    },
});

const items = computed<DropdownMenuItem[][]>(() => [
    [

        {
            label: "Primary",
            slot: "chip",
            chip: appConfig.ui.colors.primary,
            content: {
                align: "center",
                collisionPadding: 16,
            },
            children: colors.map((color) => ({
                label: color,
                chip: color,
                slot: "chip",
                checked: appConfig.ui.colors.primary === color,
                type: "checkbox",
                onSelect: (e) => {
                    e.preventDefault();

                    appConfig.ui.colors.primary = color;
                },
            })),
        },
        {
            label: "Neutral",
            slot: "chip",
            chip:
                appConfig.ui.colors.neutral === "neutral"
                    ? "old-neutral"
                    : appConfig.ui.colors.neutral,
            content: {
                align: "end",
                collisionPadding: 16,
            },
            children: neutrals.map((color) => ({
                label: color,
                chip: color === "neutral" ? "old-neutral" : color,
                slot: "chip",
                type: "checkbox",
                checked: appConfig.ui.colors.neutral === color,
                onSelect: (e) => {
                    e.preventDefault();

                    appConfig.ui.colors.neutral = color;
                },
            })),
        },


    ],

]);
</script>

<template>
    <UDropdownMenu
        :items="items"
    >
        <UButton icon="i-lucide-palette" label="Tema" color="neutral" variant="outline"/>

        <template #chip-leading="{ item }">
      <span
          :style="{
          '--chip-light': `var(--color-${(item as any).chip}-500)`,
          '--chip-dark': `var(--color-${(item as any).chip}-400)`
        }"
          class="ms-0.5 size-2 rounded-full bg-(--chip-light) dark:bg-(--chip-dark)"
      />
        </template>
    </UDropdownMenu>
</template>
