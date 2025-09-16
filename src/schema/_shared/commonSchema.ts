import z from "zod";
import { createIdForSchema } from "./utils.js";

const CommonSchema = z.object({

    tags: z.array(
        z.string().nonempty('Tag cannot be empty.')
    ),

    createdAt: z.date()
        .default(() => new Date()),

    updatedAt: z.date()
        .default(() => new Date())
}).merge(createIdForSchema())

export default CommonSchema;
