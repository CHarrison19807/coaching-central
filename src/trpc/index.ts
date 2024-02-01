import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  apiRoute: publicProcedure.query(() => {
    return { hello: "world" };
  }),
});

export type AppRouter = typeof appRouter;
