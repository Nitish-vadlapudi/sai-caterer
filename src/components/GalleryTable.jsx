import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

function GalleryTable() {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const snapshot = await getDocs(collection(db, "gallery"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setGallery(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this image?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "gallery", id));

      alert("Image deleted successfully.");

      fetchGallery();
    } catch (error) {
      console.log(error);
      alert("Error deleting image.");
    }
  };

  return (
    <div
      style={{
        marginTop: "30px",
        background: "#fff",
        borderRadius: "15px",
        padding: "25px",
        boxShadow: "0 5px 20px rgba(0,0,0,.08)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        Current Gallery
      </h2>

      {gallery.length === 0 ? (
        <p>No gallery images found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "#f3f4f6" }}>
              <th style={thStyle}>Preview</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {gallery.map((item) => (
              <tr key={item.id}>
                <td style={tdStyle}>
                  <img
                    src={item.image}
                    alt="Gallery"
                    style={{
                      width: "100px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </td>

                <td style={tdStyle}>
                  {item.category}
                </td>

                <td style={tdStyle}>
                  <button
                    onClick={() =>
                      handleDelete(item.id)
                    }
                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
  padding: "12px",
  textAlign: "left",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb",
};

export default GalleryTable;