import z from "zod";

const CommonCollection = z.object({
    _id: z.string()
        .length(24, { error: "Please provide valid _id for this data." }),

    tags: z.array(
        z.string().nonempty({ error: "Tag cannot be empty." })
    ),

    createdAt: z.date()
        .default(() => new Date()),

    updatedAt: z.date()
        .default(() => new Date())
})

export default CommonCollection;
