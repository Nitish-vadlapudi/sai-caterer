import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

function MenuTable() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      setLoading(true);

      const snapshot = await getDocs(collection(db, "menu"));

      const data = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));

      setMenuItems(data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "menu", id));

      alert("Menu item deleted successfully.");

      fetchMenu();
    } catch (error) {
      console.error(error);
      alert("Failed to delete menu item.");
    }
  };

  return (
    <div
      style={{
        marginTop: "30px",
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 5px 20px rgba(0,0,0,.08)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        Current Menu ({menuItems.length})
      </h2>

      {loading ? (
        <p>Loading menu...</p>
      ) : menuItems.length === 0 ? (
        <p style={{ color: "red" }}>
          No menu items found.
        </p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "#f3f4f6" }}>
              <th style={th}>Dish</th>
              <th style={th}>Category</th>
              <th style={th}>Type</th>
              <th style={th}>Price</th>
              <th style={th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {menuItems.map((item) => (
              <tr key={item.id}>
                <td style={td}>{item.name}</td>
                <td style={td}>{item.category}</td>
                <td style={td}>{item.type}</td>
                <td style={td}>₹ {item.price}</td>

                <td style={td}>
                  <button
                    onClick={() =>
                      handleDelete(item.id, item.name)
                    }
                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "bold",
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

const th = {
  padding: "12px",
  textAlign: "left",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb",
};

export default MenuTable;