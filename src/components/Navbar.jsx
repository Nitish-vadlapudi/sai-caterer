import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

function Navbar() {
  const [businessName, setBusinessName] = useState("Sai Caterers");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const snapshot = await getDocs(collection(db, "settings"));

      if (!snapshot.empty) {
        setBusinessName(snapshot.docs[0].data().businessName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav
      style={{
        width: "100%",
        padding: "18px 60px",
        background: "#111827",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        top: 0,
        zIndex: 1000,
      }}
    >
      <h2
        style={{
          color: "#f59e0b",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        {businessName}
      </h2>

      <div style={{ display: "flex", gap: "30px" }}>
        <Link style={linkStyle} to="/">Home</Link>
        <Link style={linkStyle} to="/menu">Menu</Link>
        <a
  href="https://wa.me/9000269526"
  target="_blank"
  rel="noopener noreferrer"
  style={linkStyle}
>
  Contact
</a>
        
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "17px",
};

export default Navbar;