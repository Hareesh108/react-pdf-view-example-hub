import { Document, Page } from "react-pdf";
import { useState } from "react";
import { pdfjs } from "react-pdf";

import "./style.css";

// Text layer for React-PDF.
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

// Importing the PDF.js worker.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export const PreviewPdf = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({
    numPages: loadedNumPages,
  }: {
    numPages: number;
  }) => {
    setNumPages(loadedNumPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setPageNumber((prev) => Math.min(prev + 1, numPages || prev));

  return (
    <>
      <div className="page">
        <nav>
          <button onClick={goToPrevPage} className="previous">
            Prev
          </button>
          <button onClick={goToNextPage} className="next">
            Next
          </button>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </nav>
        <Document
          file="src/sample/sample.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          loading="Loading PDF..."
          error="Failed to load PDF file."
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
    </>
  );
};
