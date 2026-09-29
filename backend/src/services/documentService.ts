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