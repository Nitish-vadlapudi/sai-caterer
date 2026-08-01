import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

function WebsiteSettings() {
  const [docId, setDocId] = useState("");

  const [settings, setSettings] = useState({
    businessName: "",
    phone: "",
    whatsapp: "",
    address: "",
    about: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const snapshot = await getDocs(collection(db, "settings"));

      if (!snapshot.empty) {
        const document = snapshot.docs[0];

        setDocId(document.id);

        setSettings(document.data());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      await updateDoc(doc(db, "settings", docId), settings);

      alert("Settings updated successfully.");
    } catch (error) {
      console.log(error);
      alert("Unable to update settings.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "15px",
        padding: "30px",
        boxShadow: "0 5px 20px rgba(0,0,0,.08)",
      }}
    >
      <h2 style={{ marginBottom: "25px" }}>
        ⚙ Website Settings
      </h2>

      <input
        name="businessName"
        placeholder="Business Name"
        value={settings.businessName}
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        name="phone"
        placeholder="Phone Number"
        value={settings.phone}
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        name="whatsapp"
        placeholder="WhatsApp Number"
        value={settings.whatsapp}
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        name="address"
        placeholder="Address"
        value={settings.address}
        onChange={handleChange}
        style={inputStyle}
      />

      <textarea
        name="about"
        placeholder="About Business"
        value={settings.about}
        onChange={handleChange}
        rows={5}
        style={textareaStyle}
      />

      <button
        onClick={handleSave}
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
        {loading ? "Saving..." : "Save Settings"}
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

const textareaStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "15px",
  resize: "vertical",
  boxSizing: "border-box",
};

export default WebsiteSettings;