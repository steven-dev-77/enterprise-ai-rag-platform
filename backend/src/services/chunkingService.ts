export interface DocumentChunk {
  chunkIndex: number;
  content: string;
}

export function chunkText(
  text: string,
  chunkSize: number = 1000,
  overlap: number = 200
): DocumentChunk[] {
  if (!text.trim()) {
    return [];
  }

  if (overlap >= chunkSize) {
    throw new Error("Overlap must be smaller than chunk size.");
  }

  const chunks: DocumentChunk[] = [];

  let start = 0;
  let chunkIndex = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);

    const content = text
      .slice(start, end)
      .trim();

    if (content) {
      chunks.push({
        chunkIndex,
        content,
      });

      chunkIndex++;
    }

    if (end >= text.length) {
      break;
    }

    start = end - overlap;
  }

  return chunks;
}

const sampleText = `
Enterprise AI systems use retrieval augmented generation to provide
accurate answers from internal company knowledge. Documents are processed,
split into smaller chunks, converted into embeddings, and stored in a
vector database. When a user asks a question, the system searches for
similar chunks and provides relevant context to the language model.
`;

const chunks = chunkText(sampleText, 100, 20);

console.log("Total chunks:", chunks.length);

chunks.forEach((chunk) => {
  console.log(`\nChunk ${chunk.chunkIndex}:`);
  console.log(chunk.content);
});