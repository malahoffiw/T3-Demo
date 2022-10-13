// src/server/trpc/router/index.ts
import { router } from "../trpc"
import { housesRouter } from "./houses"

export const appRouter = router({
    houses: housesRouter,
})

export type AppRouter = typeof appRouter
