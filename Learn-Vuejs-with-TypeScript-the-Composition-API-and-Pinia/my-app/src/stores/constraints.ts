const periods = ["Today", "This Week", "This Month"] as const

type Period = typeof periods[number]

export {
    periods
}

export type {
    Period
}