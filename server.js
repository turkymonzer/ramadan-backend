require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const fs = require("fs");

// Load Firebase credentials
const serviceAccount = JSON.parse(fs.readFileSync("firebase-service-account.json"));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-database-name.firebaseio.com"
});

const db = admin.database();
const app = express();
app.use(cors());
app.use(express.json());

// Get Quran parts
app.get("/quran-parts", async (req, res) => {
  const snapshot = await db.ref("quranParts").once("value");
  res.json(snapshot.val() || {});
});

// Update Quran part
app.post("/update-part", async (req, res) => {
  const { partNumber, reserved, read } = req.body;
  if (!partNumber) return res.status(400).json({ error: "Part number is required" });

  await db.ref(`quranParts/${partNumber}`).update({ reserved, read });
  res.json({ success: true });
});

// Get completion count
app.get("/completion-count", async (req, res) => {
  const snapshot = await db.ref("completionCount").once("value");
  res.json({ count: snapshot.val() || 0 });
});

// Reset counter (admin only)
app.post("/reset-counter", async (req, res) => {
  const { password } = req.body;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  await db.ref("completionCount").set(0);
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
