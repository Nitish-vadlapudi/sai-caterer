import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}

      <div
        style={{
          height: "100vh",
          background:
            "linear-gradient(rgba(0,0,0,.65), rgba(0,0,0,.65)), url('https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1800&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "white",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "70px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Sai Caterers
        </h1>

        <p
          style={{
            fontSize: "28px",
            color: "#fbbf24",
            marginBottom: "50px",
          }}
        >
          Making Every Celebration Delicious
        </p>

        <Link to="/menu">
          <button
            style={{
              background: "#f59e0b",
              color: "white",
              border: "none",
              padding: "18px 45px",
              fontSize: "20px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            View Menu
          </button>
        </Link>
      </div>

      {/* Gallery Section */}

    </>
  );
}

export default Home;