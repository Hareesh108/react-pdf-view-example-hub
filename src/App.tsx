import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/home";
import { PreviewReactPdf } from "./components/react-pdf";
import { PreviewReactViewerPdf } from "./components/react-pdf-viewer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Main routes */}
          <Route path="/" element={<Home />} />
          <Route path="/react-pdf" element={<PreviewReactPdf />} />
          <Route path="/react-pdf-viewer" element={<PreviewReactViewerPdf />} />

          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
