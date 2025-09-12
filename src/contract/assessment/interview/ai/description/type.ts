import z from "zod";
import { AIInterviewCoreZ } from "../../../../../schema/assessments/interview/ai/Description.js";

const AIInterviewCreateZ = AIInterviewCoreZ;
const AIInterviewClientZ = AIInterviewCoreZ.omit({
    aiModel: true,
    allowedGroups: true,
    customInstructions: true,
    rounds: true,
    screening: true
})

const AIInterviewUpdateZ = AIInterviewCoreZ.partial();

export {
    AIInterviewClientZ, AIInterviewCreateZ, AIInterviewUpdateZ
};


export type IAIInterviewClientZ = z.infer<typeof AIInterviewClientZ>;
