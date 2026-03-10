import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/paintings", async (_req, res) => {
    const paintings = await storage.getPaintings();
    res.json(paintings);
  });

  app.get("/api/paintings/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "معرف غير صالح" });
    }
    const painting = await storage.getPainting(id);
    if (!painting) {
      return res.status(404).json({ message: "اللوحة غير موجودة" });
    }
    res.json(painting);
  });

  return httpServer;
}
