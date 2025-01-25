import { NavLink } from "react-router";

export default function Home() {
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
          color: "#2b3242",
          fontWeight: 800,
          backgroundColor: "#f5f5f5",
          padding: "1rem",
        }}
      >
        PDF Preview Sample Application with React / Next / Remix
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
            description: (
              <>
                • Display PDFs in your React app as easily as if they were
                images <br /> • Supports annotations, text selection, and
                cross-browser compatibility
              </>
            ),
            image: "/src/assets/dummy/dummy-01.png",
            link: "https://www.npmjs.com/package/react-pdf",
            path: "/react-pdf",
          },
          {
            name: "PdfJS Dist",
            description: (
              <>
                • Core PDF.js library for advanced PDF rendering capabilities{" "}
                <br />• Enables text layer extraction and custom rendering
                implementations
              </>
            ),
            image: "/src/assets/dummy/dummy-02.png",
            link: "https://www.npmjs.com/package/pdfjs-dist",
            path: "/pdfjs-dist",
          },
          {
            name: "Using Embed",
            description: (
              <>
                • Simple implementation using native HTML <strong>embed</strong>{" "}
                tag <br />• Provides basic PDF viewing with browser-default
                controls
              </>
            ),
            image: "/src/assets/dummy/dummy-03.png",
            path: "/embed",
          },
          {
            name: "Using IFrame",
            description: (
              <>
                • Embed PDFs using HTML <strong>iframe</strong> for isolated
                content rendering <br />• Allows full PDF viewer functionality
                from hosting domain
              </>
            ),
            image: "/src/assets/dummy/dummy-04.png",
            path: "/iframe",
          },
          {
            name: "Using Object",
            description: (
              <>
                • Flexible HTML <strong>object</strong> tag implementation for
                PDF embedding <br />• Supports fallback content for incompatible
                browsers
              </>
            ),
            image: "/src/assets/dummy/dummy-05.png",
            path: "/object",
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
            <div style={{}}>
              <h2
                style={{
                  paddingLeft: "0px",
                  fontWeight: 800,
                  fontSize: "30px",
                }}
              >
                {doc.name}
              </h2>
              <p style={{ paddingLeft: "0px" }}>{doc.description}</p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  gap: 3,
                }}
              >
                <h3 style={{ paddingTop: "10px" }}>
                  Check out demo example here
                </h3>
                <NavLink to={doc.path}>
                  <img
                    src="/src/assets/svg/circle-svgrepo-com.svg"
                    width="50"
                    alt={`${doc.name} icon`}
                    style={{ cursor: "pointer" }}
                  />
                </NavLink>
              </div>

              {doc.link ? (
                <a href={doc.link} target="_blank">
                  <img src={doc.image} width="100%" alt={doc.name} />
                </a>
              ) : (
                <img src={doc.image} width="100%" alt={doc.name} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
