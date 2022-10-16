import { z } from "zod"
import { router, publicProcedure } from "../trpc"

export const housesRouter = router({
    getExact: publicProcedure
        .input(z.string())
        .query(async ({ ctx, input }) => {
            try {
                return await ctx.prisma.houses.findUnique({
                    where: {
                        id: input,
                    },
                    select: {
                        address: true,
                        area: true,
                        price: true,
                        photo: true,
                    },
                })
            } catch (error) {
                console.error("error", error)
            }
        }),
    getOwnerInfo: publicProcedure
        .input(z.string())
        .query(async ({ ctx, input }) => {
            try {
                return await ctx.prisma.houses.findUnique({
                    where: {
                        id: input,
                    },
                    select: {
                        owner: true,
                        phone: true,
                    },
                })
            } catch (error) {
                console.error("error", error)
            }
        }),
})
