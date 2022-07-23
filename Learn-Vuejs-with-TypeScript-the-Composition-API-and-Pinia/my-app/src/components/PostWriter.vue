
<script lang="ts" setup>
import type { TimelinePost } from '@/posts';
import { ref, onMounted, watch, watchEffect } from "vue"
import {useRouter} from "vue-router"
import { marked } from "marked"
import highlightjs from "highlight.js"
import debounce from "lodash/debounce"
import { usePosts } from "../stores/posts"

const props = defineProps<{
    post: TimelinePost
}>()

const title = ref(props.post.title)
const content = ref(props.post.markdown)
const html = ref('')
const contentEditable = ref<HTMLDivElement>()

const posts = usePosts()
const router  = useRouter()

// watchEffect(() => {
//     marked.parse(content.value, (err, parseResult) => {
//         html.value = parseResult
//     })
// })

const parseHtml = (markdown: string) => {
    marked.parse(markdown, {
        gfm: true,
        breaks: true,
        highlight: (code) => {
            return highlightjs.highlightAuto(code).value
        }
    }, (err, parseResult) => {
        html.value = parseResult
    })
}

const handleClick = async () => {
    const newPost : TimelinePost = {
        ...props.post,
        title: title.value,
        markdown: content.value,
        html: html.value
    }
    await posts.createPost(newPost)
    router.push("/")
}

watch(content, debounce(parseHtml, 250),
    {
        immediate: true // call for first time loaded
    })

onMounted(() => {
    if (!contentEditable.value) {
        throw Error('ContentEditable DOM was not found')
    }
    contentEditable.value.innerText = content.value
})

const handleInput = () => {
    if (!contentEditable.value) {
        throw Error('ContentEditable DOM was not found')
    }

    content.value = contentEditable.value.innerText
}
</script>

<template>
    <div class="columns">
        <div class="column">
            <div class="field">
                <div class="label">
                    Post Title
                </div>
                <input type="text" class="input" v-model="title">
            </div>

        </div>
    </div>

    <div class="columns">
        <div class="column">
            <div contenteditable ref="contentEditable" @input="handleInput" />
        </div>
        <div class="column">
            <div v-html="html"></div>
        </div>
    </div>
    <div class="columns">
        <div class="column">
            <button class="button is-primary is-pulled-right" @click="handleClick">Save Post</button>
        </div>
    </div>
</template>