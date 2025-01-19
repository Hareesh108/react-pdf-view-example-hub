import { Document, Page } from "react-pdf";
import { useEffect, useState } from "react";
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

  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleDownload = async () => {
    try {
      const response = await fetch("src/sample/sample.pdf");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "sample.pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

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

            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={toggleFullscreen}
              style={{ cursor: "pointer", margin: "0 8px" }}
            >
              {isFullscreen ? (
                <path
                  d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
                  fill="currentColor"
                />
              ) : (
                <path
                  d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                  fill="currentColor"
                />
              )}
            </svg>
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleDownload}
              style={{ cursor: "pointer", margin: "0 8px" }}
            >
              <path
                d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
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
