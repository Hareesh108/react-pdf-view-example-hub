import * as PDFJS from "pdfjs-dist";
import type {
  PDFDocumentProxy,
  RenderParameters,
} from "pdfjs-dist/types/src/display/api";
import { useCallback, useRef, useState, useEffect } from "react";
import { NavLink } from "react-router";

export default function PdfJs() {
  PDFJS.GlobalWorkerOptions.workerSrc =
    "https://unpkg.com/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs";

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy>();
  const [currentPage, setCurrentPage] = useState(1);
  let renderTask: PDFJS.RenderTask;

  const renderPage = useCallback(
    (pageNum: number, pdf = pdfDoc) => {
      const canvas = canvasRef.current;
      if (!canvas || !pdf) return;
      canvas.height = 0;
      canvas.width = 0;
      // canvas.hidden = true;
      pdf
        .getPage(pageNum)
        .then((page) => {
          const viewport = page.getViewport({ scale: 1.5 });
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          const renderContext: RenderParameters = {
            canvasContext: canvas.getContext("2d")!,
            viewport: viewport,
          };
          try {
            if (renderTask) {
              renderTask.cancel();
            }
            renderTask = page.render(renderContext);
            return renderTask.promise;
          } catch (error) {
            console.log(error);
          }
        })
        .catch((error) => console.log(error));
    },
    [pdfDoc]
  );

  useEffect(() => {
    renderPage(currentPage, pdfDoc);
  }, [pdfDoc, currentPage, renderPage]);

  useEffect(() => {
    const loadingTask = PDFJS.getDocument("src/sample/sample.pdf");
    loadingTask.promise.then(
      (loadedDoc) => {
        setPdfDoc(loadedDoc);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  const nextPage = () =>
    pdfDoc && currentPage < pdfDoc.numPages && setCurrentPage(currentPage + 1);

  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <button onClick={prevPage} disabled={currentPage <= 1}>
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage >= (pdfDoc?.numPages ?? -1)}
        >
          Next
        </button>
      </div>

      <div
        style={{
          height: "80vh",
          border: "1px solid",
          marginTop: "5px",
          overflow: "scroll",
        }}
      >
        <canvas ref={canvasRef}></canvas>
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "2rem",
          color: "#333",
        }}
      >
        <NavLink to="/">Go back home</NavLink>
      </div>
    </div>
  );
}
