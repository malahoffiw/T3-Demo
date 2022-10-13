import { z } from "zod"
import { router, publicProcedure } from "../trpc"

export const housesRouter = router({
    getAll: publicProcedure.query(async ({ ctx }) => {
        try {
            return await ctx.prisma.houses.findMany({
                select: {
                    id: true,
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
