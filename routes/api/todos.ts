import { HandlerContext } from "$fresh/server.ts";

import { DB } from "https://deno.land/x/sqlite/mod.ts";

// Open a database
const db = new DB("db.sqlite");
db.execute(`
  CREATE TABLE IF NOT EXISTS todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL
  )
`);

export const handler = async (req: Request, _ctx: HandlerContext): Response => {
  try {
    switch (req.method) {
      case "GET": {
        const result = db.query("SELECT * FROM todo");
        console.log(result);
        const body = JSON.stringify(result, null, 2);
        return new Response(body, {
          headers: { "content-type": "application/json" },
        });
      }
      case "POST": {
        const content = await req.json().catch(() => null);
        if (typeof content !== "string" || content.length > 256) {
          return new Response("Bad Request", { status: 400 });
        }
        db.query("INSERT INTO todo (content) VALUES (?)", [content]);
        return new Response("", { status: 201 });
      }
      default:
        return new Response("Method Not Allowed", { status: 405 });
    }
  } catch (err) {
    console.error(err);
    return new Response(`Internal Server Error\n\n${err.message}`);
  }
  return new Response("runing");
};
