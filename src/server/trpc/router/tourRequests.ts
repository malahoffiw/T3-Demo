import { z } from "zod"
import { router, publicProcedure, protectedProcedure } from "../trpc"

export const tourRequestsRouter = router({
    createTourRequest: protectedProcedure
        .input(
            z.object({
                userPhone: z.string(),
                scheduledFor: z.date(),
                houseId: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                await ctx.prisma.tourRequests.create({
                    data: {
                        userPhone: input.userPhone,
                        scheduledFor: input.scheduledFor,
                        userId: ctx.session.user.id,
                        houseId: input.houseId,
                    },
                })
            } catch (error) {
                console.log(error)
            }
        }),
    getUserTourRequests: protectedProcedure.query(async ({ ctx }) => {
        try {
            return await ctx.prisma.tourRequests.findMany({
                where: {
                    userId: ctx.session.user.id,
                },
                select: {
                    id: true,
                    createdAt: true,
                    houseId: true,
                    scheduledFor: true,
                    userPhone: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            })
        } catch (error) {
            console.log(error)
        }
    }),
    getHouseTourRequests: publicProcedure
        .input(z.string())
        .query(async ({ ctx, input }) => {
            try {
                return await ctx.prisma.tourRequests.findMany({
                    where: {
                        houseId: input,
                    },
                    select: {
                        id: true,
                        userId: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                })
            } catch (error) {
                console.log(error)
            }
        }),
})
