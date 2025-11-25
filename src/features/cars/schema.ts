import { EPermission } from "@/lib/enum";
import { z } from "zod";

export const carSchema = z.object({
  car_no: z.number(),
  car_fueltype: z.string(),
  car_tankcapacity: z.string(),
  car_mileage: z.string(),
  car_chassisnumber: z.string(),
  car_enginenumber: z.string(),
  car_fiscalpower: z.string(),
  car_payload: z.string(),
  car_acquisitiondate: z.string(),
  car_acquisitiontype: z.string(),
  car_registrationnumber: z.string(),
  car_circulationdate: z.string(),
  car_acquisitionvalue: z.string(),
  car_owner: z.string(),
  car_addons: z.object(),
});
