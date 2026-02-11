import express from "express";
import cors from "cors";
import { createServer as createHTTPServer } from "http";

const app = express();
const httpServer = createHTTPServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check
app.get("/api/ping", (req, res) => {
  res.json({ message: "pong", timestamp: new Date().toISOString() });
});

// Demo endpoint
app.get("/api/demo", (req, res) => {
  res.json({ 
    message: "CloudHop API is working!",
    version: "2.0.0",
    features: ["DJ Queue", "Music Management", "Real-time Collaboration"]
  });
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`🚀 CloudHop server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});

export default app;
