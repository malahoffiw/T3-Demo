import { z } from "zod"
import { router, protectedProcedure } from "../trpc"

export const userRouter = router({
    updateUserName: protectedProcedure
        .input(z.string())
        .mutation(async ({ ctx, input }) => {
            try {
                await ctx.prisma.user.update({
                    where: {
                        id: ctx.session.user.id,
                    },
                    data: {
                        name: input,
                    },
                })
            } catch (error) {
                console.log(error)
            }
        }),
})
