import z from "zod";
import { BuilderCoreZ, IBuilderZ } from "../../../schema/users/builder/builderProfile.js";


export const BuilderUpdateZ = BuilderCoreZ.partial();
export const BuilderCreateZ = BuilderCoreZ;

export type IBuilderClientZ = IBuilderZ;
export type IBuilderCreateZ = z.infer<typeof BuilderCreateZ>;
export type IBuilderUpdateZ = z.infer<typeof BuilderUpdateZ>;

