<script lang="ts" setup>
import PostWriter from '@/components/PostWriter.vue';
import type { TimelinePost } from '@/posts';
import { DateTime } from 'luxon/src/luxon';

const post: TimelinePost = {
    id: "-1",
    title: "Title",
    created: DateTime.now(),
    markdown: '## Title',
    html: '<h2>Title</h2>'
}
</script>

<template>
<h1>New Post</h1>
<PostWriter :post="post"/>
</template>