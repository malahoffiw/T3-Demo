// src/server/trpc/router/index.ts
import { router } from "../trpc"
import { tourRequestsRouter } from "./tourRequests"

export const appRouter = router({
    tourRequests: tourRequestsRouter,
})

export type AppRouter = typeof appRouter
