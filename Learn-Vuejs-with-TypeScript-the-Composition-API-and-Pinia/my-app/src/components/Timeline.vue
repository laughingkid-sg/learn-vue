<script setup lang="ts">
import { DateTime } from "luxon/src/luxon";
import { ref, computed } from "vue"
import type {
    TimelinePost
} from "../posts"
import TimelineItemVue from "./TimelineItem.vue";
import {usePosts} from "../stores/posts"
import { periods } from "../stores/constraints"
import type { Period } from "../stores/constraints"
// type Period = "Today" | "This Week" | "This Month"

const postsStore = usePosts()
// if await -> must use suspense
await postsStore.fetechPosts()

</script>

<template>
    <nav class="is-primary panel">
        <span class="panel-tabs">
            <a v-for="period of periods" :key="period" :class="{ 'is-active': period === postsStore.selectedPeriod }"
                @click="postsStore.setSelectedPeriod(period)">
                {{ period }}
            </a>
        </span>

        <TimelineItemVue 
        v-for="post of postsStore.filteredPosts" 
        :key="post.id"
        :post="post"></TimelineItemVue>

    </nav>
</template>