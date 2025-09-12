import z from "zod";
import { CandidateCoreZ, ICandidateZ } from "../../../schema/users/candidate/candidateProfile.js";



export const CandidateUpdateZ = CandidateCoreZ.partial();
export const CandidateCreateZ = CandidateCoreZ;

export type ICandidateClientZ = ICandidateZ;
export type ICandidateCreateZ = z.infer<typeof CandidateCreateZ>;
export type ICandidateUpdateZ = z.infer<typeof CandidateUpdateZ>;

