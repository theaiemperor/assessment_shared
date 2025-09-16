import z from "zod";
import CommonSchema from "../../../_shared/commonSchema.js";
import { createIdForSchema } from "../../../_shared/utils.js";


const AIInterviewLogCoreZ = z.object({

    actor: z.object({
        actorID: z.string().describe("ID of the user/admin/bot who performed the action"),
        role: z.enum(["system", "admin", "builder", "ai_assistant"])
            .describe("Who triggered this change"),
    }),

    action: z.object({
        operation: z.enum(['add', 'update', 'delete', 'append', 'pop', 'obj']),
        field: z.string(),
        prevValue: z.any()
    }),

    roundId: z.string()
        .length(24)
        .optional()
        .describe("Round id if changes were made to round"),

    justification: z.string()
        .optional()
        .describe("Reason/explanation for this change (if provided by admin or AI)"),

    notes: z.string()
        .optional()
        .describe("Any extra notes or contextual info for this log entry")

}).merge(createIdForSchema('interviewId'));


const AIInterviewLogZ = z.object({
    ...CommonSchema.pick({ _id: true, createdAt: true }).shape,
    ...AIInterviewLogCoreZ.shape
})

export {
    AIInterviewLogCoreZ,
    AIInterviewLogZ
};

export type IAIInterviewLogCoreZ = z.infer<typeof AIInterviewLogCoreZ>;
export type IAIInterviewLogZ = z.infer<typeof AIInterviewLogZ>;
