import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function AddGalleryImage() {
  const [formData, setFormData] = useState({
    image: "",
    category: "Starters",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.image) {
      alert("Please enter an image URL.");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "gallery"), {
        image: formData.image,
        category: formData.category,
      });

      alert("Gallery image added successfully!");

      setFormData({
        image: "",
        category: "Starters",
      });
    } catch (error) {
      console.log(error);
      alert("Error adding image.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        marginTop: "25px",
        background: "#ffffff",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 5px 20px rgba(0,0,0,.08)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        Add Gallery Image
      </h2>

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        style={inputStyle}
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        style={inputStyle}
      >
        <option>Starters</option>
        <option>Main Course</option>
        <option>Desserts</option>
        <option>Drinks</option>
        <option>Events</option>
      </select>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          background: "#f59e0b",
          color: "#fff",
          border: "none",
          padding: "12px 25px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {loading ? "Saving..." : "Save Image"}
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "15px",
  boxSizing: "border-box",
};

export default AddGalleryImage;