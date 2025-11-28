import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { client } from "@/lib/db-pgsql";
import { driverSchema } from "../schema";

const app = new Hono()
  .get("/", async (c) => {
    const result = await client.query("SELECT * FROM f_employee");

    return c.json({ result: result.rows });
  })
  .post("/", zValidator("json", driverSchema), async (c) => {
    const values = await c.req.valid("json");
    console.log("first");
    console.log(values);

    /* const result = await client.query(
      "CALL public.create_employee ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
      [
        values.em_firstname,
        values.em_lastname,
        values.em_birthday,
        values.em_nationality,
        values.em_birthplace,
        values.em_address,
        values.em_phonenumber,
        values.em_email,
        values.em_emergencynumber,
        values.em_type,
        values.em_addons,
      ]
    ); */

    return c.json({ message: "chauffeur crée" });
  })
  .delete("/", zValidator("json", driverSchema), async (c) => {
    const values = await c.req.valid("json");

    const result = await client.query(
      "DELETE FROM public.f_employee WHERE em_no=$1",
      [values.em_no]
    );

    return c.json({ message: "chauffeur supprimé" });
  });

export default app;
