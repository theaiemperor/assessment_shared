import z from "zod";
import CommonSchema from "../../_shared/commonSchema.js";
import { createIdForSchema } from "../../_shared/utils.js";


const businessCategories = [
    "Retail",
    "Food & Beverage",
    "Services",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Technology",
    "Real Estate",
    "Transportation & Logistics",
    "Construction",
    "Entertainment & Media",
    "Travel & Hospitality",
    "Agriculture",
    "Automotive",
    "Energy & Utilities",
    "Telecommunications",
    "Legal Services",
    "Non-Profit & NGOs",
    "Arts & Crafts",
    "Beauty & Personal Care",
    "E-commerce",
    "Event Planning",
    "Fitness & Wellness",
    "Pets & Animals",
    "Home Services",
    "Consulting",
    "Government & Public Sector",
    "HR & Recruitment",
    "Marketing & Advertising",
    "Other"
] as const;



export const BuilderCoreZ = z.object({

    name: z.string()
        .describe('Name of the Profile holder'),

    description: z.string()
        .describe('Professional and Good looking detailed description about builder in minimum 200 words.'),

    country: z.string()
        .describe('Country of the builder'),

    goal: z.string()
        .describe('Goal of the builder in one line'),

    size: z.enum(['individual', 'micro', 'small', 'medium', 'large', 'enterprise'])
        .describe('Size of the business'),

    category: z.enum(businessCategories, { required_error: "Category is required" })
        .describe('In which category current builder is falling.'),

    coreValues: z.string()
        .describe('Core values of the builder'),

    productOrServices: z.string()
        .describe('All the products or services offered.'),

}).merge(createIdForSchema('authId'))


export const BuilderZ = z.object({
    ...CommonSchema.omit({ tags: true }).shape,
    ...BuilderCoreZ.shape
});


export type IBuilderCoreZ = z.infer<typeof BuilderCoreZ>;
export type IBuilderZ = z.infer<typeof BuilderZ>;