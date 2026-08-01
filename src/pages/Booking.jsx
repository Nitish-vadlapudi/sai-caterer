import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import Navbar from "../components/Navbar";
import { useOrder } from "../context/OrderContext";
import menuData from "../data/menuData";
import { db } from "../firebase/firebase";

function Booking() {
  const navigate = useNavigate();

  const {
    selectedItems,
    plates,
    setSelectedItems,
    setPlates,
  } = useOrder();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    location: "",
    guests: plates,
    eventType: "Wedding",
    requirements: "",
  });

  const allItems = [
    ...menuData.starters,
    ...menuData.mainCourse,
    ...menuData.desserts,
    ...menuData.drinks,
  ];

  const calculateEstimate = () => {
    let totalPerPlate = 0;

    selectedItems.forEach((selected) => {
      const item = allItems.find((i) => i.name === selected);

      if (item) totalPerPlate += item.price;
    });

    return totalPerPlate * Number(formData.guests || 0);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedItems.length === 0) {
      alert("Please select at least one menu item.");
      return;
    }

    if (!formData.guests || Number(formData.guests) <= 0) {
      alert("Please enter the number of guests.");
      return;
    }

    if (
      !formData.name ||
      !formData.phone ||
      !formData.date ||
      !formData.location
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "bookings"), {
        customerName: formData.name,
        phone: formData.phone,
        eventDate: formData.date,
        eventLocation: formData.location,
        guests: Number(formData.guests),
        eventType: formData.eventType,
        requirements: formData.requirements,
        selectedItems,
        estimatedCost: calculateEstimate(),
        createdAt: serverTimestamp(),
      });

      setSelectedItems([]);
      setPlates("");

      navigate("/thank-you");
    } catch (error) {
      console.error(error);
      alert("Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          background: "#f8fafc",
          minHeight: "100vh",
          padding: "40px",
          marginTop: "90px",
        }}
      >
        <div
          style={{
            maxWidth: "850px",
            margin: "auto",
            background: "white",
            padding: "35px",
            borderRadius: "15px",
            boxShadow: "0 5px 20px rgba(0,0,0,.08)",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            Complete Your Booking
          </h1>

          <div
            style={{
              background: "#fff7ed",
              border: "1px solid #f59e0b",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "35px",
            }}
          >
            <h2>Your Order</h2>

            {selectedItems.length === 0 ? (
              <p>No items selected.</p>
            ) : (
              <ul>
                {selectedItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            <p>
              <strong>Number of Guests:</strong> {formData.guests}
            </p>

            <p
              style={{
                color: "#f59e0b",
                fontWeight: "bold",
                fontSize: "24px",
              }}
            >
              Estimated Cost : ₹ {calculateEstimate().toLocaleString()}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="text"
              name="location"
              placeholder="Event Location"
              value={formData.location}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="number"
              name="guests"
              placeholder="Number of Guests"
              value={formData.guests}
              onChange={handleChange}
              style={inputStyle}
            />

            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              style={inputStyle}
            >
              <option>Wedding</option>
              <option>Birthday</option>
              <option>Corporate Event</option>
              <option>House Warming</option>
              <option>Engagement</option>
              <option>Anniversary</option>
              <option>Reception</option>
              <option>Baby Shower</option>
              <option>Other</option>
            </select>

            <textarea
              rows="6"
              name="requirements"
              placeholder="Special Requirements (If Any)"
              value={formData.requirements}
              onChange={handleChange}
              style={{
                ...inputStyle,
                resize: "none",
              }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "16px",
                border: "none",
                background: "#f59e0b",
                color: "white",
                fontSize: "18px",
                borderRadius: "10px",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                fontWeight: "bold",
              }}
            >
              {loading ? "Submitting..." : "Submit Booking"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "16px",
  boxSizing: "border-box",
};

export default Booking;