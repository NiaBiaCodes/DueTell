import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export async function extractPdfText(file: File): Promise<string> {
  // Convert the uploaded PDF into binary data.
  const arrayBuffer = await file.arrayBuffer();

  // Give that binary data to PDF.js.
  const pdf = await pdfjsLib.getDocument({
    data: new Uint8Array(arrayBuffer),
  }).promise;

  const pages: string[] = [];

  // PDF.js numbers pages starting at 1.
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);

    // Get all text elements from this page.
    const textContent = await page.getTextContent();

    // Pull the actual text out of each PDF text item.
    const text = textContent.items
      .map((item) => {
        if ("str" in item) {
          return item.str;
        }

        return "";
      })
      .join(" ");

    pages.push(text);
  }

  // Combine all pages into one string.
  return pages.join("\n\n");
}