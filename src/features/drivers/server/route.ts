import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "@/features/schema";
import createAdminClient from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { setCookie } from "hono/cookie";
import { sessionMiddleware } from "@/lib/session-middleware";
import { AUTH_COOKIE } from "@/lib/constants";
import { client } from "@/lib/db-pgsql";
import { driverDocumentSchema, driverSchema } from "../schema";
import { InputFile } from "node-appwrite/file";
import z from "zod";

const app = new Hono()
  .get("/", async (c) => {
    const result = await client.query("SELECT * FROM f_employee");

    return c.json({ result: result.rows });
  })
  .post("/", zValidator("json", driverSchema), async (c) => {
    const values = await c.req.valid("json");

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
  .post("/uploadFiles", zValidator("form", driverDocumentSchema), async (c) => {
    const fileSchema = z.instanceof(File);
    const bucket_id = process.env.NEXT_PUBLIC_APPWRITE_ID!;

    const file = c.req.valid("form");

    const storage = (await createAdminClient()).storage;

    if (fileSchema.safeParse(file.file)) {
      const response = await storage.createFile(
        bucket_id,
        ID.unique(),
        InputFile.fromBuffer(file.file, file.nom)
      );

      console.log(response);
    }

    return c.json({ message: "files uploaded" });
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
