import { DateTime } from "luxon"

interface Post {
    id: string
    title: string
    created: string
}

const today: Post = {
    id: "1",
    title: "Today",
    created: DateTime.now().toISO()
}

const thisWeek: Post = {
    id: "2",
    title: "This Week",
    created: DateTime.now().minus({days: 5}).toISO()
}

const thisMonth: Post = {
    id: "3",
    title: "This Month",
    created: DateTime.now().minus({weeks: 3}).toISO()
}

export {
    today,
    thisWeek,
    thisMonth
}

export type {
    Post
}