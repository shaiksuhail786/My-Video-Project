
import { GoogleGenAI } from "@google/genai";
import { VideoLength } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateVideoFromContent = async (
  content: string,
  length: VideoLength
): Promise<string> => {
  try {
    console.log("Step 1: Generating video script and prompt...");
    const videoLengthDescription = length === VideoLength.MEDIUM ? '5 to 10 minutes' : '20 to 30 minutes';

    const scriptPrompt = `
      Based on the following content, create a single, concise, and highly descriptive prompt for an AI video generation model (like Google Veo).
      The prompt should encapsulate the entire narrative and visual style for a ${videoLengthDescription} explanatory video.
      The video needs to be engaging, clear, visually rich, and friendly in tone.
      Focus on a single, powerful prompt that can guide the video generation process.

      Here is the content to base the prompt on:
      ---
      ${content}
      ---

      Example of a good output format:
      "A dynamic and engaging explainer video, about ${videoLengthDescription} long. It starts with an animated title sequence... [describe key scenes, visual style, transitions, and narration tone]... ending with a clear call to action."
    `;

    const promptResponse = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: scriptPrompt,
    });
    
    const videoPrompt = promptResponse.text;
    console.log("Generated Video Prompt:", videoPrompt);

    if (!videoPrompt) {
      throw new Error("Failed to generate a video prompt from the content.");
    }

    console.log("Step 2: Starting video generation with Veo...");
    let operation = await ai.models.generateVideos({
      model: 'veo-2.0-generate-001',
      prompt: videoPrompt,
      config: {
        numberOfVideos: 1,
      },
    });

    console.log("Step 3: Polling for video generation result...");
    while (!operation.done) {
      await sleep(10000); // Poll every 10 seconds
      console.log("Checking operation status...");
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    if (operation.error) {
        throw new Error(`Video generation operation failed: ${operation.error.message}`);
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

    if (!downloadLink) {
      throw new Error("Video generation completed, but no download link was found.");
    }
    
    console.log("Video generation successful. Download link:", downloadLink);
    
    // The API key must be appended for the client to download the video
    return `${downloadLink}&key=${process.env.API_KEY}`;

  } catch (error) {
    console.error("Error in Gemini service:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred during video generation.");
  }
};
