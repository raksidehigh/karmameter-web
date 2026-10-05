import { describe, expect, it } from "vitest";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  InvalidFileFormatException,
  extractPdfFromBuffer,
  extractPdfFromUrl,
  isPdfBuffer,
} from "../pdf-extractor";

const FIXTURE_PDF = join(__dirname, "fixtures", "dummy.pdf");
const EXPECTED_TXT = join(__dirname, "fixtures", "expected.txt");
const PUBLIC_PDF_URL =
  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

describe("isPdfBuffer", () => {
  it("returns true for a valid PDF buffer", async () => {
    const buf = await readFile(FIXTURE_PDF);
    expect(isPdfBuffer(buf)).toBe(true);
  });

  it("returns false for non-PDF bytes", () => {
    expect(isPdfBuffer(Buffer.from("<!doctype html><html>"))).toBe(false);
    expect(isPdfBuffer(Buffer.from("hello world"))).toBe(false);
    expect(isPdfBuffer(Buffer.alloc(0))).toBe(false);
  });
});

describe("extractPdfFromBuffer (unit)", () => {
  it("returns extracted text string and page count for valid PDF", async () => {
    const buf = await readFile(FIXTURE_PDF);
    const result = await extractPdfFromBuffer(buf);

    expect(typeof result.text).toBe("string");
    expect(result.text.length).toBeGreaterThan(0);
    expect(result.text).toContain("Dummy PDF file");
    expect(result.numPages).toBe(1);
  });

  it("throws InvalidFileFormatException for non-PDF input", async () => {
    const bad = Buffer.from("<!doctype html><html><body>not a pdf</body></html>");
    await expect(extractPdfFromBuffer(bad)).rejects.toThrow(
      InvalidFileFormatException
    );
  });
});

describe("extractPdfFromUrl (integration)", () => {
  it(
    "extracted text matches reference fixture",
    async () => {
      const expected = (await readFile(EXPECTED_TXT, "utf-8")).trim();
      const result = await extractPdfFromUrl(PUBLIC_PDF_URL);

      expect(result.numPages).toBe(1);
      expect(result.text).toContain(expected);
    },
    30_000
  );
});
