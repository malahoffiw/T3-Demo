import { z } from "zod"
import { router, publicProcedure } from "../trpc"

export const userRouter = router({
    getExact: publicProcedure
        .input(z.string())
        .query(async ({ ctx, input }) => {
            try {
                return await ctx.prisma.user.findUnique({
                    where: {
                        id: input,
                    },
                    select: {
                        name: true,
                        email: true,
                        image: true,
                    },
                })
            } catch (error) {
                console.error("error", error)
            }
        }),
})
