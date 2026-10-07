import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { requireAuth, AuthRequest } from "./src/middleware/auth.ts";
import { getOrCreateUser } from "./src/db/users.ts";
import { createEnquiry, getAllEnquiries } from "./src/db/enquiries.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", cloudsql: true });
  });

  // Post Enquiry
  app.post("/api/enquiries", async (req, res) => {
    try {
      const { name, email, phone, service, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required" });
      }
      const record = await createEnquiry({ name, email, phone, service: service || 'General', message });
      return res.json({ success: true, enquiry: record });
    } catch (error: any) {
      console.error("Error creating enquiry:", error);
      return res.status(500).json({ error: error.message || "Failed to save enquiry" });
    }
  });

  // Get All Enquiries
  app.get("/api/enquiries", async (req, res) => {
    try {
      const list = await getAllEnquiries();
      return res.json({ success: true, enquiries: list });
    } catch (error: any) {
      console.error("Error fetching enquiries:", error);
      return res.status(500).json({ error: error.message || "Failed to fetch enquiries" });
    }
  });

  // Authenticated user sync route
  app.post("/api/auth/sync", requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.user || !req.user.uid || !req.user.email) {
        return res.status(400).json({ error: "Invalid user token payload" });
      }
      const dbUser = await getOrCreateUser(req.user.uid, req.user.email, req.user.name);
      return res.json({ success: true, user: dbUser });
    } catch (error: any) {
      console.error("Auth sync error:", error);
      return res.status(500).json({ error: error.message || "Failed to sync user" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
