import z from "zod";
import { AIInterviewResultZ } from "../../../../../schema/assessments/interview/ai/Result.js";



const AIInterviewResultClientZ = AIInterviewResultZ.omit({
    meta: true,
    tags: true,
})

export type IAIInterviewResultClientZ = z.infer<typeof AIInterviewResultClientZ>;
