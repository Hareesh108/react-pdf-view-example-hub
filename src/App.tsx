import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/home";
import PreviewReactPdf from "./page/react-pdf/page";
import PreviewEmbed from "./page/embed";
import PreviewIFrame from "./page/iframe";
import PreviewObject from "./page/object";
import PreviewPdfJSDist from "./page/pdfjs-dist";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Main routes */}
          <Route path="/" element={<Home />} />
          <Route path="/react-pdf" element={<PreviewReactPdf />} />
          <Route path="/pdfjs-dist" element={<PreviewPdfJSDist />} />
          <Route path="/embed" element={<PreviewEmbed />} />
          <Route path="/iframe" element={<PreviewIFrame />} />
          <Route path="/object" element={<PreviewObject />} />

          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
