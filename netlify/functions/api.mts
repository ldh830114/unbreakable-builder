import { getStore } from "@netlify/blobs";

export default async (req) => {
  const url = new URL(req.url);
  const path = url.pathname.replace("/api", "");
  const store = getStore({ name: "hiit-data", consistency: "strong" });

  if (req.method === "GET" && path === "/templates") {
    const data = await store.get("templates", { type: "json" });
    return new Response(JSON.stringify(data || []), { headers: { "Content-Type": "application/json" } });
  }

  if (req.method === "POST" && path === "/templates") {
    const body = await req.json();
    await store.setJSON("templates", body);
    return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
  }

  if (req.method === "GET" && path === "/library") {
    const data = await store.get("library", { type: "json" });
    return new Response(JSON.stringify(data || null), { headers: { "Content-Type": "application/json" } });
  }

  if (req.method === "POST" && path === "/library") {
    const body = await req.json();
    await store.setJSON("library", body);
    return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
  }

  if (req.method === "GET" && path === "/session") {
    const data = await store.get("current-session", { type: "json" });
    return new Response(JSON.stringify(data || null), { headers: { "Content-Type": "application/json" } });
  }

  if (req.method === "POST" && path === "/session") {
    const body = await req.json();
    await store.setJSON("current-session", body);
    return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
  }

  return new Response("Not found", { status: 404 });
};

export const config = {
  path: "/api/*",
};
