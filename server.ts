import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Support large image payloads (up to 25MB)
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in the Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Host check & health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Endpoint to generate a new starter product image via Imagen 3 (imagen-4.0-generate-001) or gemini-2.1 models
app.post("/api/generate-product", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      res.status(400).json({ error: "Prompt is required to generate a product product." });
      return;
    }

    const ai = getGeminiClient();
    
    // We use imagen-4.0-generate-001 for extremely high-quality standalone product shots
    const response = await ai.models.generateImages({
      model: "imagen-4.0-generate-001",
      prompt: `${prompt}, clean studio product photography, commercial product mockup shot, centered solid minimalist studio background, 8k, professional lightning`,
      config: {
        numberOfImages: 1,
        outputMimeType: "image/jpeg",
        aspectRatio: "1:1",
      },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      res.status(500).json({ error: "Failed to generate image. No image returned." });
      return;
    }

    const base64Bytes = response.generatedImages[0].image.imageBytes;
    const imageUrl = `data:image/jpeg;base64,${base64Bytes}`;
    res.json({ imageUrl });
  } catch (error: any) {
    console.error("Error generating product starter:", error);
    res.status(500).json({ error: error.message || "Internal server error during generation" });
  }
});

// Endpoint to visualize the product in different mediums using gemini-2.5-flash-image (nano banana)
app.post("/api/visualize", async (req, res) => {
  try {
    const { productImage, medium, style, customDescription } = req.body;
    if (!productImage) {
      res.status(400).json({ error: "Product image base64 data is required." });
      return;
    }
    if (!medium) {
      res.status(400).json({ error: "Marketing medium is required." });
      return;
    }

    const ai = getGeminiClient();

    // Strip out the data URI prefix if it exists
    let cleanBase64 = productImage;
    let mimeType = "image/png";
    const dataUriMatch = productImage.match(/^data:([^;]+);base64,(.+)$/);
    if (dataUriMatch) {
      mimeType = dataUriMatch[1];
      cleanBase64 = dataUriMatch[2];
    }

    // Compose a robust prompt for image-to-image visualization
    let mediumInstructions = "";
    switch (medium) {
      case "mug":
        mediumInstructions = "Place this exact product design/logo from the input image seamlessly applied onto the side of a sleek porcelain coffee mug. The mug is placed on a gorgeous wooden cafe table with cozy background bokeh.";
        break;
      case "billboard":
        mediumInstructions = "Mount this product design elegantly as the featured ad on a giant digital landscape billboard towering high above a metropolitan city avenue at sunset, with urban surrounding lights.";
        break;
      case "tshirt":
        mediumInstructions = "Print this exact product logo or graphic design cleanly on the chest center of a high-quality cotton t-shirt mockup. The t-shirt is modeled beautifully by a person or displayed as a styled lifestyle flatlay in a designer's studio.";
        break;
      case "tote":
        mediumInstructions = "This exact product label or emblem is beautifully printed on the center of an organic cotton canvas tote bag, hanging on a classic wooden hook against a cream-colored textured wall.";
        break;
      case "subway":
        mediumInstructions = "Place this product label/branding on a stylish illuminated lightbox advertisement poster located in a modern subway station corridor. Pedestrians walk by in stylish slow-motion blur.";
        break;
      case "smartphone":
        mediumInstructions = "Mock up the product graphics/artwork so it is displayed beautifully on the screen of an elegant smartphone lying on a luxury desktop workspace with soft shadows.";
        break;
      case "laptop_sticker":
        mediumInstructions = "Render this product design as a sharp, die-cut vinyl sticker applied on the brushed aluminum lid of a premium laptop computer, next to a notepad in an office studio.";
        break;
      default:
        mediumInstructions = `Render this product design seamlessly as a mockup advertisement on a ${medium}.`;
    }

    // Apply the chosen style aesthetic
    let styleDetails = "";
    switch (style) {
      case "cyberpunk":
        styleDetails = "The aesthetic is futuristic cyberpunk, characterized by high-contrast neon blues, glowing magenta highlights, dark rain-slicked city streets, and a tech-noire mood.";
        break;
      case "editorial":
        styleDetails = "The aesthetic is high-end editorial and minimalist, with clean layouts, elegant neutral color palettes, soft daylight shadows, and premium architectural vibes.";
        break;
      case "warm":
        styleDetails = "The aesthetic is warm and cozy, with rich amber tones, soft morning sunlight streams, organic textures, and a welcoming feel.";
        break;
      case "studio":
        styleDetails = "The aesthetic is clean studio product mock-ups, with sophisticated professional studio strobe flash lighting, clean neutral studio backdrops, and photorealistic precision.";
        break;
      default:
        styleDetails = "Provide a high-fidelity, photorealistic, professional marketing mockup presentation.";
    }

    const finalPrompt = `
      You are an elite product placement AI visualizer. Your vital task is to generate a realistic marketing mockup using the provided product image.
      You must preserve absolute design consistency of the product (the shape, logo, branding, colors, characters) from the input image and insert it cleanly into the new medium.
      
      Target Medium: ${mediumInstructions}
      Visual Style: ${styleDetails}
      ${customDescription ? `Additional requests: ${customDescription}` : ""}
      
      Ensure a pristine, 8k quality, professional advert mock-up. Do not include random watermarks, overlays, or generic templates. Show only the clean mockup photo.
    `;

    // Call gemini-2.5-flash-image (referred to as nano banana) for image editing/conforming
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType,
            },
          },
          {
            text: finalPrompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        }
      },
    });

    let generatedBase64 = "";
    let textResponse = "";

    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          generatedBase64 = part.inlineData.data;
        } else if (part.text) {
          textResponse += part.text;
        }
      }
    }

    if (!generatedBase64) {
      res.status(500).json({ 
        error: "No image was generated by gemini-2.5-flash-image. Let's make sure the prompt fits successfully.",
        details: textResponse
      });
      return;
    }

    res.json({
      imageUrl: `data:image/png;base64,${generatedBase64}`,
      feedback: textResponse.trim()
    });
  } catch (error: any) {
    console.error("Error visualising on medium:", error);
    res.status(500).json({ error: error.message || "Failed to visualize product with AI" });
  }
});

// Configure Vite middleware for development or static file serving for production
async function startServer() {
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
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
