import z from "zod";
import { missionRessourceSchema } from "./schema";

export type MissionRessourceSchema = z.infer<typeof missionRessourceSchema>;
