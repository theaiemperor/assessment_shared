import z from "zod";
import { createIdForSchema } from "./utils.js";

const CommonCollection = z.object({

    ...createIdForSchema(),

    tags: z.array(
        z.string().nonempty({ error: "Tag cannot be empty." })
    ),

    createdAt: z.date()
        .default(() => new Date()),

    updatedAt: z.date()
        .default(() => new Date())
})

export default CommonCollection;
