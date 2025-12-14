import { EPermission } from "@/lib/enum";
import { z } from "zod";

export const missionDocumentSchema = z.object({
	file: z.file().or(z.string()),
	hashname: z.string(),
	nom: z.string(),
	fileID: z.string().optional(),
});

export const missionAffectationShema = z.object({
	miss_no: z.string(),
	miss_driver: z.string(),
	miss_car: z.string(),
});

export const missionTableInfo = z.object({
	miss_no: z.string(),
	miss_client: z.string(),
	miss_horaire: z.string(),
	miss_expectedhourdeparture: z.string(),
	miss_expectedhourarrival: z.string(),
	miss_trajetzone: z.string(),
	miss_budget: z.string(),
	miss_status: z.string(),
	miss_intitule: z.string(),
});

export const missionSchema = z.object({
	miss_no: z.string(),
	miss_intitule: z.string(),
	miss_description: z.string(),
	miss_client: z.string(),
	miss_trajetzone: z.string(),
	miss_expecteddatedeparture: z.string(),
	miss_expecteddatearrival: z.string(),
	miss_expectedhourdeparture: z.string(),
	miss_expectedhourarrival: z.string(),
	miss_expectedduration: z.string(),
	miss_expecteddistance: z.string(),
	miss_expectedfuelbudget: z.string(),
	miss_othersexpectedbudget: z.string(),
	miss_expectedtotalbudget: z.string(),
	miss_addons: z
		.object({
			driver: z.string(),
			car: z.string(),
			status: z.string(),
			documents: z.array(missionDocumentSchema),
		})
		.optional(),
});
