import z from "zod";
import { AIInterviewResultZ } from "../../../../../_db/mongo/interviews/AIInterview/Result.js";

// types
type IAIInterviewResultZ = z.infer<typeof AIInterviewResultZ>;
type IAIInterviewResultClientZ = Omit<z.infer<typeof AIInterviewResultZ>, 'meta'>

export {
    AIInterviewResultZ,
}

export type {
    IAIInterviewResultZ,
    IAIInterviewResultClientZ
}