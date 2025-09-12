import z from "zod";
import { CandidateInterviewProfileCoreZ, ICandidateInterviewProfileZ } from "../../../../schema/assessments/interview/profile/CandidateInterviewProfile.js";



export const CandidateInterviewProfileCreateZ = CandidateInterviewProfileCoreZ.omit({ resumeContent: true });
export const CandidateInterviewProfileUpdateZ = CandidateInterviewProfileCreateZ.partial();

export type ICandidateInterviewProfileClientZ = ICandidateInterviewProfileZ;
export type ICandidateInterviewProfileCreateZ = z.infer<typeof CandidateInterviewProfileCreateZ>;
export type ICandidateInterviewProfileUpdateZ = z.infer<typeof CandidateInterviewProfileUpdateZ>;

