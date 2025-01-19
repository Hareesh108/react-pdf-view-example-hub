import "./App.css";
import { PreviewPdf } from "./components/react-pdf";

function App() {
  return (
    <div
      style={{
        padding: "20px",
        paddingRight: "100px",
        paddingLeft: "100px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "#333",
        }}
      >
        PDF Preview Application with React / Next / Remix
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "2rem",
          padding: "1rem",
        }}
      >
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "1rem",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              maxHeight: "350px",
              overflow: "hidden",
            }}
          >
            <PreviewPdf />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
