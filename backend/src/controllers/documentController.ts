import { Request, Response } from "express";
import { PDFParse } from "pdf-parse";
import { createDocument } from "../services/documentService";

export async function uploadDocument(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "No file uploaded",
      });
    }

    const filename = req.file.originalname;
    let content: string;

    if (req.file.mimetype === "application/pdf") {
      const parser = new PDFParse({ data: req.file.buffer });
      try {
        const pdfData = await parser.getText();
        content = pdfData.text;
      } finally {
        await parser.destroy();
      }   
    } else {
      content = req.file.buffer.toString("utf-8");
    }

    const document = await createDocument(filename, content, {
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    return res.status(201).json({
      status: "ok",
      message: "Document uploaded successfully",
      document,
    });
  } catch (error) {
    console.error("Document upload failed:", error);

    return res.status(500).json({
      status: "error",
      message: "Failed to upload document",
    });
  }
}