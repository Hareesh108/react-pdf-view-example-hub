import "./App.css";

function App() {
  return (
    <div
      style={{
        padding: "20px",
        paddingRight: "100px",
        paddingLeft: "100px",
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
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem",
          padding: "1rem",
        }}
      >
        {[
          {
            name: "React-PDF",
            description:
              "Display PDFs in your React app as easily as if they were images. React-PDF supports all modern browsers.",
            image: "/src/assets/react-pdf.png",
            link: "https://www.npmjs.com/package/react-pdf",
          },
          {
            name: "React PDF Viewer",
            description:
              "A React component to view a PDF document. It's written in TypeScript, and powered by React hooks completely.",
            image: "/src/assets/react-pdf-viewer.png",
            link: "https://www.npmjs.com/package/@react-pdf-viewer/core",
          },
        ].map((doc, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              padding: "1.3rem",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              maxHeight: "350px",
              overflow: "hidden",
            }}
          >
            <div>
              <h2>{doc.name}</h2>
              <p>{doc.description}</p>
              <a href={doc.link} target="_blank">
                <img src={doc.image} width="100%" alt={doc.name} />
              </a>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  gap: 3,
                }}
              >
                <h3>Check out demo example here</h3>
                <img
                  src="/src/assets/svg/circle-svgrepo-com.svg"
                  width="50"
                  alt={`${doc.name} icon`}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
