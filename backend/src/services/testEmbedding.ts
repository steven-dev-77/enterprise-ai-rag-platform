
import dotenv from "dotenv";
import { generateEmbedding } from "./embeddingService";

dotenv.config();

async function main() {
  try {
    const embedding = await generateEmbedding(
      "Enterprise AI systems use RAG to answer questions from documents."
    );

    console.log("Embedding generated successfully!");
    console.log("Vector dimensions:", embedding.length);
    console.log("First five values:", embedding.slice(0, 5));
  } catch (error) {
    console.error("Embedding test failed:", error);
  }
}

main();
