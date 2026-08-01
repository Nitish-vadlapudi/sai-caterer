import { Link } from "react-router-dom";

function ThankYou() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8fafc",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "50px",
          borderRadius: "18px",
          boxShadow: "0 8px 25px rgba(0,0,0,.1)",
          textAlign: "center",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: "70px",
            marginBottom: "20px",
          }}
        >
          ✅
        </div>

        <h1
          style={{
            color: "#111827",
            marginBottom: "15px",
          }}
        >
          Booking Submitted Successfully!
        </h1>

        <p
          style={{
            color: "#555",
            lineHeight: "28px",
            marginBottom: "35px",
          }}
        >
          Thank you for choosing <strong>Sai Caterers</strong>.
          <br />
          We have received your booking request.
          <br />
          Our team will contact you shortly to confirm your event details.
        </p>

        <Link to="/">
          <button
            style={{
              background: "#f59e0b",
              color: "white",
              border: "none",
              padding: "15px 35px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ThankYou;