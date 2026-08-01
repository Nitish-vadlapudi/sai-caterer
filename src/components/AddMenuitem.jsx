import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function AddMenuItem() {
  const [formData, setFormData] = useState({
    name: "",
    category: "Starters",
    type: "Veg",
    price: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.price
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "menu"), {
        name: formData.name,
        category: formData.category,
        type: formData.type,
        price: Number(formData.price),
      });

      alert("Menu item added successfully!");

      setFormData({
        name: "",
        category: "Starters",
        type: "Veg",
        price: "",
      });
    } catch (error) {
      console.log(error);
      alert("Error adding menu item.");
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
        Add New Menu Item
      </h2>

      <input
        name="name"
        placeholder="Dish Name"
        value={formData.name}
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
      </select>

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        style={inputStyle}
      >
        <option>Veg</option>
        <option>Non Veg</option>
      </select>

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        style={inputStyle}
      />

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
        {loading ? "Saving..." : "Save Menu Item"}
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

export default AddMenuItem;