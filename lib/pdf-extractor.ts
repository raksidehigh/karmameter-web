import { PDFParse } from "pdf-parse";

export class InvalidFileFormatException extends Error {
  constructor(message = "Invalid file format: expected PDF") {
    super(message);
    this.name = "InvalidFileFormatException";
  }
}

export function isPdfBuffer(buf: Buffer): boolean {
  // PDFs start with %PDF; reject anything else before parsing
  if (!buf || buf.length < 4) return false;
  return buf.subarray(0, 4).toString() === "%PDF";
}

export interface PdfExtractResult {
  text: string;
  numPages: number;
  info?: Record<string, unknown>;
}

export async function extractPdfFromBuffer(buf: Buffer): Promise<PdfExtractResult> {
  if (!isPdfBuffer(buf)) {
    throw new InvalidFileFormatException();
  }

  const parser = new PDFParse({ data: buf });
  try {
    const textResult = await parser.getText();
    let info: Record<string, unknown> | undefined;
    try {
      const infoResult = await parser.getInfo();
      info = (infoResult.info ?? undefined) as Record<string, unknown> | undefined;
    } catch {
      // metadata is optional — text + page count are the contract
    }

    return {
      text: textResult.text ?? "",
      numPages: textResult.total ?? 0,
      info,
    };
  } finally {
    await parser.destroy().catch(() => {});
  }
}

export async function extractPdfFromUrl(url: string): Promise<PdfExtractResult> {
  // Download as binary buffer, then reuse the buffer extractor
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download PDF: ${res.status} ${res.statusText}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  return extractPdfFromBuffer(buf);
}
