import type { Post, TimelinePost } from "@/posts"
import { today, thisWeek, thisMonth } from "../posts"
import { defineStore } from "pinia"
import type { Period } from "./constraints"
import { DateTime } from "luxon"

interface PostState {
    ids: string[] // ["1", "2"]
    all: Map<string, Post>
    selectedPeriod: Period
}

const delay = () => {
    return new Promise<void>(res => setTimeout(res, 1000))
}

export const usePosts = defineStore("posts", {
    state: (): PostState => ({
        ids: [],
        all: new Map(),
        selectedPeriod: "Today",
    }),

    actions: {
        setSelectedPeriod(period: Period) {
            this.selectedPeriod = period
        },

        async fetechPosts () {
            const res = await window.fetch("http://localhost:8000/posts")
            const data = (await res.json()) as Post[]
            await delay() // for suspense demo

            let ids: string[] = []
            let all = new Map<string, Post>()
            for (const post of data) {
                ids.push(post.id)
                all.set(post.id, post)
            }

            this.ids = ids
            this.all = all
        }
    },

    getters: {
        filteredPosts: (state): TimelinePost[] => {
            return state.ids
                .map((id) => {
                    const post = state.all.get(id)
                    if (!post) {
                        throw Error(`Post with id of ${id} was expected but not found`)
                    }
                    return {
                        ...post,
                        created: DateTime.fromISO(post.created),
                    }
                })
                .filter((p) => {
                    if (state.selectedPeriod === "Today") {
                        return p.created >= DateTime.now().minus({ day: 1 })
                    }

                    if (state.selectedPeriod === "This Week") {
                        return p.created >= DateTime.now().minus({ week: 1 })
                    }

                    return p
                })
        },
    },
})
