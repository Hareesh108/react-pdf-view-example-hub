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
            path: "/react-pdf",
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
