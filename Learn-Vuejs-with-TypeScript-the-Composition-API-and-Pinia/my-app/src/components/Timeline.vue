<script setup lang="ts">
import { DateTime } from "luxon/src/luxon";
import { ref, computed } from "vue"
import {
    today,
    thisWeek,
    thisMonth, type Post
} from "../posts"

// type Period = "Today" | "This Week" | "This Month"

const periods = ["Today", "This Week", "This Month"] as const
type Period = typeof periods[number]

const selectedPeriod = ref<Period>("Today")

const selectPeriod = (period: Period) => selectedPeriod.value = period

const posts = computed(() => {
    return [today, thisWeek, thisMonth,]
        .map(p => {
            return {
                ...p,
                created: DateTime.fromISO(p.created)
            }
        })
        .filter(p => {
            if (selectedPeriod.value === "Today") {
                return p.created >= DateTime.now().minus({ day: 1 })
            }

            if (selectedPeriod.value === "This Week") {
                return p.created >= DateTime.now().minus({ week: 1 })
            }

            return p
        })
})
</script>

<template>
    <nav class="is-primary panel">
        <span class="panel-tabs">
            <a v-for="period of periods" :key="period" :class="{ 'is-active': period === selectedPeriod }"
                @click="selectPeriod(period)">
                {{ period }}
            </a>
        </span>

        <a v-for="post of posts" :key="post.id" class="panel-block">
            <a>{{ post.title }}</a>
            <div>{{ post.created.toFormat("d MMM") }}</div>
        </a>

    </nav>
</template>