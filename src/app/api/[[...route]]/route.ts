import { Hono } from "hono";
import { handle } from "hono/vercel";
import auth from "@/features/auth/server/route";
import drivers from "@/features/drivers/server/route";
export const runtime = "nodejs";

const app = new Hono().basePath("api");

const routes = app.route("/auth", auth).route("drivers", drivers);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
