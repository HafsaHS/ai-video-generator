const express = require("express");
const cors = require("cors");
require("dotenv").config();
const RunwayML = require("@runwayml/sdk");

const app = express();

// ✅ Correct and full CORS setup
app.use(
  cors({
    origin: "http://localhost:3000",
    mode: "no-cors",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.post("/api/suplimax", async (req, res) => {
  const { features, audience, tone, style } = req.body;

  const promptText = `
    Create a short marketing video (15–30 seconds) for a fictional energy drink called "Suplimax".

    Product Features:
    ${features}

    Target Audience:
    ${audience}

    Tone:
    ${tone}

    Video Style:
    ${style}

    The drink can design includes bold, sporty colors and lightning graphics. The brand name "Suplimax" should appear clearly in the video. End the video with the slogan: "Fuel the Fire."
  `;

  const client = new RunwayML({ apiKey: process.env.RUNWAYML_API_SECRET });

  try {
    // 👇 Replace with your actual image URL (or generate/upload one)
    const imageToVideo = await client.imageToVideo.create({
      model: "gen4_turbo",
      promptImage:
        "https://raw.githubusercontent.com/HafsaHS/ai-video-generator/refs/heads/main/client/public/suplimax.png",
      promptText,
      ratio: "1280:720",
      duration: 5,
    });

    const taskId = imageToVideo.id;

    // Poll until video is ready
    let task;
    do {
      await new Promise((resolve) => setTimeout(resolve, 10000));
      task = await client.tasks.retrieve(taskId);
    } while (!["SUCCEEDED", "FAILED"].includes(task.status));

    if (task.status === "SUCCEEDED") {
      res.json({
        videoUrl: task.output?.videoUrl,
        prompt: promptText,
      });
    } else {
      res.status(500).json({ error: "Video generation failed." });
    }
  } catch (error) {
    console.error("RunwayML Error:", error);
    res.status(500).json({ error: "Failed to generate video." });
  }
});

app.post("/api/realestate", async (req, res) => {
  const { style, duration, musicStyle, cameraMovement } = req.body;

  const promptText = `Generate a virtual video tour of a real estate property with the following details:

Address: 12012 Crest Ct, Beverly Hills, CA 90210
Price: $10,183,985
Bedrooms: 5
Bathrooms: 6.5
Square Footage: 6100 sq ft
Features: Luxury estate, Three-car garage, Landscaped grounds, Elegant entrance with grand staircase, Modern design, Prime Beverly Hills location

Tour Style: ${style}
Duration: ${duration}
Music Style: ${musicStyle}
Camera Movement: ${cameraMovement}

Make it visually appealing, smooth, and reflect the chosen tour style. Showcase the property's luxury features and prime Beverly Hills location.`;

  const client = new RunwayML({ apiKey: process.env.RUNWAYML_API_SECRET });

  try {
    const imageToVideo = await client.imageToVideo.create({
      model: "gen4_turbo",
      promptImage: "https://ssl.cdn-redfin.com/photo/40/bigphoto/717/25546717_0.jpg", 
      promptText,
      ratio: "1280:720",
      duration: 5,
    });

    const taskId = imageToVideo.id;
    let task;
    do {
      await new Promise((resolve) => setTimeout(resolve, 10000));
      task = await client.tasks.retrieve(taskId);
    } while (!["SUCCEEDED", "FAILED"].includes(task.status));

    if (task.status === "SUCCEEDED") {
      res.json({
        videoUrl: task.output?.videoUrl,
        prompt: promptText,
      });
    } else {
      res.status(500).json({ error: "Video generation failed." });
    }
  } catch (error) {
    console.error("RunwayML Error (Real Estate):", error);
    res.status(500).json({ error: "Failed to generate real estate video." });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
