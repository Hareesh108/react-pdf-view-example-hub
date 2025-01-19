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

  const [scale, setScale] = useState(1.2);

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

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 2.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));

  return (
    <>
      <div className="page">
        <nav>
          <button
            onClick={goToPrevPage}
            className="previous"
            disabled={pageNumber <= 1}
          >
            Prev
          </button>
          <button
            onClick={goToNextPage}
            className="next"
            disabled={pageNumber >= (numPages || 0)}
          >
            Next
          </button>

          <p>
            Page {pageNumber} of {numPages}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={zoomOut}
              style={{ cursor: "pointer", margin: "0 8px" }}
            >
              <path
                d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                fill="currentColor"
              />
            </svg>
            <div style={{ padding: 1 }}>{Math.round(scale * 100)}%</div>

            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={zoomIn}
              style={{ cursor: "pointer", margin: "0 8px" }}
            >
              <path
                d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                fill="currentColor"
              />
            </svg>
          </div>
        </nav>

        <div
          style={{
            border: "1px solid #cecece",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            width: "730px",
            height: "80vh",
            overflow: "scroll",
          }}
        >
          <Document
            file="src/sample/sample.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            loading="Loading PDF..."
            error="Failed to load PDF file."
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              loading={<div>Loading page...</div>}
            />
          </Document>
        </div>
      </div>
    </>
  );
};
