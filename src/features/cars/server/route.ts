import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "@/features/schema";
import createAdminClient from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { setCookie } from "hono/cookie";
import { sessionMiddleware } from "@/lib/session-middleware";
import { AUTH_COOKIE } from "@/lib/constants";
import { client } from "@/lib/db-pgsql";
import { carSchema } from "../schema";

const app = new Hono()
  .get("/", async (c) => {
    const result = await client.query("SELECT * FROM f_cars");

    return c.json({ result: result.rows });
  })
  .post("/", zValidator("json", carSchema), async (c) => {
    const values = await c.req.valid("json");

    await client.query(
      "CALL public.insert_car ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)",
      [
        values.car_fueltype,
        values.car_tankcapacity,
        values.car_mileage,
        values.car_chassisnumber,
        values.car_enginenumber,
        values.car_fiscalpower,
        values.car_payload,
        values.car_acquisitiondate,
        values.car_acquisitiontype,
        values.car_registrationnumber,
        values.car_circulationdate,
        values.car_acquisitionvalue,
        values.car_owner,
        values.car_addons,
      ]
    );

    return c.json({ message: "Véhicule crée" });
  })
  .delete("/", zValidator("json", carSchema), async (c) => {
    const values = await c.req.valid("json");

    const result = await client.query(
      "DELETE FROM public.f_cars WHERE car_no=$1",
      [values.car_no]
    );

    return c.json({ message: "véhicule supprimé" });
  });

export default app;
