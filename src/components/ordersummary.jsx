import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderSummary({
  selectedItems,
  plates,
  setPlates,
  calculateEstimate,
}) {
  const navigate = useNavigate();

  const [itemError, setItemError] = useState("");
  const [plateError, setPlateError] = useState("");

  const handleContinue = () => {
    setItemError("");
    setPlateError("");

    let valid = true;

    if (selectedItems.length === 0) {
      setItemError("Please select at least one menu item.");
      valid = false;
    }

    if (!plates || Number(plates) <= 0) {
      setPlateError("Please enter the number of plates.");
      valid = false;
    }

    if (!valid) return;

    navigate("/booking");
  };

  return (
    <div
      style={{
        background: "white",
        borderRadius: "15px",
        padding: "25px",
        boxShadow: "0 5px 20px rgba(0,0,0,.08)",
        position: "sticky",
        top: "100px",
      }}
    >
      <h2 style={{ marginBottom: "15px" }}>
        🛒 Your Order
      </h2>

      <hr />

      <h3 style={{ marginTop: "20px" }}>
        Selected Items ({selectedItems.length})
      </h3>

      {selectedItems.length === 0 ? (
        <p style={{ color: "#666" }}>
          No items selected.
        </p>
      ) : (
        <div style={{ marginTop: "10px" }}>
          {selectedItems.map((item) => (
            <p key={item}>✔ {item}</p>
          ))}
        </div>
      )}

      {itemError && (
        <p
          style={{
            color: "red",
            fontSize: "14px",
            marginTop: "5px",
          }}
        >
          * {itemError}
        </p>
      )}

      <hr style={{ margin: "25px 0" }} />

      <h3>Number of Plates</h3>

      <input
        type="number"
        inputMode="numeric"
        value={plates}
        onChange={(e) => {
          setPlates(e.target.value);
          setPlateError("");
        }}
        placeholder="Enter number of plates"
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",

          // Hide arrows in Firefox
          MozAppearance: "textfield",
        }}
      />

      {plateError && (
        <p
          style={{
            color: "red",
            fontSize: "14px",
            marginTop: "5px",
          }}
        >
          * {plateError}
        </p>
      )}

      <hr style={{ margin: "25px 0" }} />

      <h3>Estimated Cost</h3>

      <h1
        style={{
          color: "#f59e0b",
        }}
      >
        ₹ {calculateEstimate().toLocaleString()}
      </h1>

      <button
        onClick={handleContinue}
        style={{
          width: "100%",
          padding: "15px",
          marginTop: "20px",
          border: "none",
          borderRadius: "10px",
          background: "#f59e0b",
          color: "white",
          fontWeight: "bold",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Continue Booking →
      </button>
    </div>
  );
}

export default OrderSummary;