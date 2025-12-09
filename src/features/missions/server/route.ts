import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "@/features/schema";
import createAdminClient from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { setCookie } from "hono/cookie";
import { sessionMiddleware } from "@/lib/session-middleware";
import { AUTH_COOKIE } from "@/lib/constants";
import { client } from "@/lib/db-pgsql";
import { missionDocumentSchema, missionSchema } from "../schema";
import { InputFile } from "node-appwrite/file";
import z from "zod";

const app = new Hono()
	.get("/", async (c) => {
		const result = await client.query("SELECT * FROM f_mission");

		return c.json({ result: result.rows });
	})
	.get("/missionsInfoTable", async (c) => {
		const result =
			await client.query(`select miss_no,miss_intitule, miss_client ,miss_expectedhourdeparture,
		miss_expectedhourarrival,miss_trajetzone,
      miss_expectedtotalbudget as miss_budget, 
	  miss_addons ->> 'status' as miss_status
      from public.f_mission
 `);

		const format_result = result.rows.map((row) => {
			return {
				...row,
				miss_horaire: `De ${row.miss_expectedhourdeparture} à ${row.miss_expectedhourarrival}`,
			};
		});

		return c.json({ result: format_result });
	})
	.get("/file/:fileID", async (c) => {
		const fileID = c.req.param("fileID");
		const storage = (await createAdminClient()).storage;

		const bucket_id = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;

		const file_metadata = await storage.getFile(
			bucket_id, // bucketId
			fileID // fileId
		);

		const result = await storage.getFileDownload(
			bucket_id, // bucketId
			fileID // fileId
		);

		return new Response(result, {
			headers: {
				"Content-Type": "application/octet-stream",
				"Content-Disposition": `attachment; filename="${file_metadata.name}.pdf"`,
			},
		});
	})
	.get("/:mission", async (c) => {
		const mission = c.req.param("mission");
		const result = await client.query(
			"SELECT * FROM public.f_mission where miss_no = $1",
			[mission]
		);

		return c.json({ result: result.rows });
	})
	.post("/", zValidator("json", missionSchema), async (c) => {
		const values = c.req.valid("json");

		await client.query(
			"CALL public.insert_mission ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)",
			[
				values.miss_intitule,
				values.miss_description,
				values.miss_client,
				values.miss_trajetzone,
				values.miss_expecteddatedeparture,
				values.miss_expecteddatearrival,
				values.miss_expectedhourdeparture,
				values.miss_expectedhourarrival,
				values.miss_expectedduration,
				values.miss_expecteddistance,
				values.miss_expectedfuelbudget,
				values.miss_othersexpectedbudget,
				values.miss_expectedtotalbudget,
				values.miss_addons,
			]
		);

		return c.json({ message: "Mission crée" });
	})
	.post("/uploadFile", zValidator("form", missionDocumentSchema), async (c) => {
		const fileSchema = z.instanceof(File);
		const bucket_id = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;

		const file = c.req.valid("form");

		const storage = (await createAdminClient()).storage;
		const file_id = ID.unique();

		if (fileSchema.safeParse(file.file)) {
			const response = await storage.createFile(
				bucket_id,
				file_id,
				InputFile.fromBuffer(file.file, file.nom + "." + "pdf")
			);
		}

		return c.json({ message: "files uploaded", id: file_id });
	})
	.delete(
		"/deleteFile",
		zValidator("json", z.object({ files: z.array(z.string()) })),
		async (c) => {
			const fileSchema = z.instanceof(File);
			const bucket_id = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;

			const { files } = c.req.valid("json");

			const storage = (await createAdminClient()).storage;

			for (let index = 0; index < files.length; index++) {
				const response = await storage.deleteFile(bucket_id, files[index]);
			}

			return c.json({ message: "files deleted" });
		}
	)
	.delete("/", zValidator("json", missionSchema), async (c) => {
		const values = c.req.valid("json");

		const result = await client.query(
			"DELETE FROM public.f_mission WHERE mission_no=$1",
			[values.miss_no]
		);

		return c.json({ message: "mission supprimé" });
	});

export default app;
