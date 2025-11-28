import { EPermission } from "@/lib/enum";
import { z } from "zod";

const driverDocumentSchema = z.object({
  file_name: z.string(),
  name: z.string(),
});

export const driverSchema = z.object({
  em_no: z.string(),
  em_firstname: z.string().min(3, {
    message: "Veuillez renseigner le prénom du chauffeur",
  }),
  em_lastname: z.string().min(3, {
    message: "Veuillez renseigner le nom du chauffeur",
  }),
  em_birthday: z.string(),
  em_nationality: z
    .string()
    .min(3, { message: "Veuillez renseigner la nationalité" }),
  em_birthplace: z
    .string()
    .min(3, { message: "Veuillez renseigner le lieu de naissance" }),
  em_address: z
    .string()
    .min(3, { message: "Veuillez renseigner l'adresse du chauffeur" }),
  em_phonenumber: z
    .string()
    .min(9, { message: "Veuillez renseigner le numéro du chauffeur" })
    .max(14),
  em_emergencynumber: z
    .string()
    .min(9, { message: "Veuillez renseigner le numéro du chauffeur" })
    .max(14),
  em_email: z.email(),
  em_type: z.string(),
  em_addons: z.object({
    permis: z.string(),
    date_embauche: z.string(),
    cnss: z.string(),
    base_salary: z.string(),
    matricule: z.string(),
    ipm: z.string(),
    contract_type: z.string(),
    documents: z.array(driverDocumentSchema),
  }),
});
