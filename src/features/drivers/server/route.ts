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
    const result = await client.query("SELECT * FROM public.f_employee");

    return c.json({ result: result.rows });
  })
  .get("/driversInfoTable", async (c) => {
    const result =
      await client.query(`select (em_firstname || ' ' || em_lastname) as em_fullname,
      em_addons ->> 'matricule' as em_matricule,
      em_addons ->> 'vehicule' as em_car
      ,em_addons ->> 'last_mission' as em_lastmission,
      em_addons ->> 'availability' as em_status from f_employee `);
    return c.json({ result: result.rows });
  })
  .post("/", zValidator("json", driverSchema), async (c) => {
    const values = await c.req.valid("json");

    const result = await client.query(
      "CALL public.insert_employee ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
      [
        values.em_firstname,
        values.em_lastname,
        values.em_birthday,
        values.em_nationality,
        values.em_birthplace,
        values.em_address,
        values.em_phonenumber,
        values.em_emergencynumber,
        values.em_email,
        Number(values.em_type),
        values.em_addons,
      ]
    );

    return c.json({ message: "chauffeur crée" });
  })
  .post("/uploadFile", zValidator("form", driverDocumentSchema), async (c) => {
    const fileSchema = z.instanceof(File);
    const bucket_id = process.env.NEXT_PUBLIC_APPWRITE_ID!;

    const file = c.req.valid("form");

    const storage = (await createAdminClient()).storage;
    const file_id = ID.unique();

    if (fileSchema.safeParse(file.file)) {
      const response = await storage.createFile(
        bucket_id,
        file_id,
        InputFile.fromBuffer(file.file, file.nom)
      );
    }

    return c.json({ message: "files uploaded", id: file_id });
  })
  .delete(
    "/deleteFile",
    zValidator("json", z.object({ files: z.array(z.string()) })),
    async (c) => {
      const fileSchema = z.instanceof(File);
      const bucket_id = process.env.NEXT_PUBLIC_APPWRITE_ID!;

      const { files } = c.req.valid("json");

      const storage = (await createAdminClient()).storage;

      for (let index = 0; index < files.length; index++) {
        const response = await storage.deleteFile(bucket_id, files[index]);
      }

      return c.json({ message: "files deleted" });
    }
  )
  .delete("/", zValidator("json", driverSchema), async (c) => {
    const values = await c.req.valid("json");

    const result = await client.query(
      "DELETE FROM AMD.public.f_employee WHERE em_no=$1",
      [values.em_no]
    );

    return c.json({ message: "chauffeur supprimé" });
  });

export default app;
