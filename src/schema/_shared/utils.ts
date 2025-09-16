import z from "zod";

export function createIdForSchema(field: string = "_id") {
    return z.object(
        {
            [field]: z.string()
                .length(24, `Please provide valid ${field} for this data.`),

        }
    );
};
