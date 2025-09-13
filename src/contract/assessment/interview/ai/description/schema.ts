import z from "zod";
import { AIInterviewDescriptionCoreZ } from "../../../../../schema/assessments/interview/ai/Description.js";

const AIInterviewDescriptionCreateZ = AIInterviewDescriptionCoreZ;
const AIInterviewDescriptionClientZ = AIInterviewDescriptionCoreZ.omit({
    aiModel: true,
    allowedGroups: true,
    customInstructions: true,
    rounds: true,
    screening: true
})

const AIInterviewDescriptionUpdateZ = AIInterviewDescriptionCoreZ.partial();

export {
    AIInterviewDescriptionClientZ, AIInterviewDescriptionCreateZ, AIInterviewDescriptionUpdateZ
};


export type IAIInterviewDescriptionClientZ = z.infer<typeof AIInterviewDescriptionClientZ>;
