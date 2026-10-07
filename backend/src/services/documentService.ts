import { pool } from "../config/database";

export async function createDocument(
  filename: string,
  content: string,
  metadata: Record<string, unknown> = {}
) {
  const result = await pool.query(
    `
    INSERT INTO documents (filename, content, metadata)
    VALUES ($1, $2, $3)
    RETURNING id, filename, created_at
    `,
    [filename, content, metadata]
  );

  return result.rows[0];
}

export async function createDocumentChunks(
  documentId: string,
  chunks: {
    chunkIndex: number;
    content: string;
  }[],
  metadata: Record<string, unknown> = {}
) {
  for (const chunk of chunks) {
    await pool.query(
      `
      INSERT INTO document_chunks
        (document_id, chunk_index, content, metadata)
      VALUES
        ($1, $2, $3, $4)
      `,
      [
        documentId,
        chunk.chunkIndex,
        chunk.content,
        metadata,
      ]
    );
  }
}