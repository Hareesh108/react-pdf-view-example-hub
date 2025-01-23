import { NavLink } from "react-router";

export default function Page() {
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
      <object
        data="src/sample/sample.pdf"
        type="application/pdf"
        style={{ height: "90vh", width: "50%" }}
      />
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
