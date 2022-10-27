// src/server/trpc/router/index.ts
import { router } from "../trpc"
import { tourRequestsRouter } from "./tourRequests"
import { userRouter } from "./user"

export const appRouter = router({
    tourRequests: tourRequestsRouter,
    user: userRouter,
})

export type AppRouter = typeof appRouter
