// src/server/trpc/router/index.ts
import { router } from "../trpc"
import { housesRouter } from "./houses"
import { tourRequestsRouter } from "./tourRequests"
import { userRouter } from "./user"

export const appRouter = router({
    houses: housesRouter,
    tourRequests: tourRequestsRouter,
    user: userRouter,
})

export type AppRouter = typeof appRouter
